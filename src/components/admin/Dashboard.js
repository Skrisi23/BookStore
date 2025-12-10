
import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';
import RentalManagement from './RentalManagement';
import BookManagement from './BookManagement';
import { getBooks, getRentals, getUsers } from '../../api';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBooks: 0,
    activeRentals: 0,
    totalUsers: 0,
    todayRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    async function loadStats() {
      try {
        setLoading(true);
        // Párhuzamosan lekérjük az adatokat
        const [booksData, rentalsData, usersData] = await Promise.all([
          getBooks(ac.signal).catch(() => []),
          getRentals(ac.signal).catch(() => []),
          getUsers(ac.signal).catch(() => [])
        ]);

        const books = Array.isArray(booksData) ? booksData : [];
        const rentals = Array.isArray(rentalsData) ? rentalsData : [];
        const users = Array.isArray(usersData) ? usersData : [];

        // Aktív kölcsönzések számítása: ha nincs visszahozva_datuma, akkor aktív
        const activeRentals = rentals.filter(r => 
          !r.visszahozva_datuma && !r.returnedDate
        ).length;

        // TODO: Mai bevétel számítása - ehhez kellene egy payments/transactions tábla
        const todayRevenue = 15000; // Placeholder

        setStats({
          totalBooks: books.length,
          activeRentals: activeRentals,
          totalUsers: users.length,
          todayRevenue: todayRevenue
        });
      } catch (e) {
        console.error('Statisztikák betöltése sikertelen:', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
    return () => ac.abort();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Betöltés...</span>
          </div>
        </div>
      ) : (
        <>
          <Statistics stats={stats} />

          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="bi bi-grid me-2"></i>
                Áttekintés
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'rentals' ? 'active' : ''}`}
                onClick={() => setActiveTab('rentals')}
              >
                <i className="bi bi-bookmark-check me-2"></i>
                Kölcsönzések
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
                onClick={() => setActiveTab('books')}
              >
                <i className="bi bi-book me-2"></i>
                Könyvek
              </button>
            </li>
          </ul>

          {activeTab === 'overview' && (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Üdvözlünk az Admin Dashboard-on! Válassz egy fület a menüből.
            </div>
          )}

          {activeTab === 'rentals' && <RentalManagement />}
          {activeTab === 'books' && <BookManagement />}
        </>
      )}
    </div>
  );
}

export default Dashboard;
