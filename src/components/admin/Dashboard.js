
import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';
import RentalManagement from './RentalManagement';
import BookManagement from './BookManagement';
import { getBooks, getRentals, getUsers, getTodayRevenue } from '../../api';

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
        const [booksData, rentalsData, usersData, revenueData] = await Promise.all([
          getBooks(ac.signal).catch(() => []),
          getRentals(ac.signal).catch(() => []),
          getUsers(ac.signal).catch(() => []),
          getTodayRevenue(ac.signal).catch(() => ({ total_revenue: 0 }))
        ]);

        const books = Array.isArray(booksData) ? booksData : [];
        const rentals = Array.isArray(rentalsData) ? rentalsData : [];
        const users = Array.isArray(usersData) ? usersData : [];

        // Aktív kölcsönzések számítása: ha nincs visszahozva_datuma, akkor aktív
        const activeRentals = rentals.filter(r => 
          !r.visszahozva_datuma && !r.returnedDate
        ).length;

        setStats({
          totalBooks: books.length,
          activeRentals: activeRentals,
          totalUsers: users.length,
          todayRevenue: revenueData.total_revenue || 0
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
    <div className="container-fluid" style={{ paddingTop: '2rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ fontWeight: 700 }}>
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

          <ul className="nav nav-tabs mb-4" style={{ borderBottom: '2px solid #1a1a1a' }}>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                style={activeTab === 'overview' ? { color: '#1a1a1a', fontWeight: 600, borderColor: '#1a1a1a #1a1a1a #fff', borderRadius: 0 } : { color: '#888', borderRadius: 0 }}
              >
                Áttekintés
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'rentals' ? 'active' : ''}`}
                onClick={() => setActiveTab('rentals')}
                style={activeTab === 'rentals' ? { color: '#1a1a1a', fontWeight: 600, borderColor: '#1a1a1a #1a1a1a #fff', borderRadius: 0 } : { color: '#888', borderRadius: 0 }}
              >
                Kölcsönzések
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
                onClick={() => setActiveTab('books')}
                style={activeTab === 'books' ? { color: '#1a1a1a', fontWeight: 600, borderColor: '#1a1a1a #1a1a1a #fff', borderRadius: 0 } : { color: '#888', borderRadius: 0 }}
              >
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
