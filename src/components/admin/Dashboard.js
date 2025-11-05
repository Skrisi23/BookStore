
import React, { useState, useEffect } from 'react';
import Statistics from './Statistics';
import RentalManagement from './RentalManagement';
import BookManagement from './BookManagement';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBooks: 0,
    activeRentals: 0,
    totalUsers: 0,
    todayRevenue: 0
  });

  useEffect(() => {
    // Számoljuk ki a statisztikákat
    const books = JSON.parse(localStorage.getItem('adminBooks') || '[]');
    const rentals = JSON.parse(localStorage.getItem('rentals') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    setStats({
      totalBooks: books.length || 5,
      activeRentals: rentals.filter(r => r.status === 'active').length || 2,
      totalUsers: users.length || 10,
      todayRevenue: 15000
    });
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </h2>
      </div>

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
    </div>
  );
}

export default Dashboard;
