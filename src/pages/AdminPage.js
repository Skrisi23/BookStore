
import React from 'react';
import Dashboard from '../components/admin/Dashboard';
import { useAuth } from '../context/AuthContext';

function AdminPage({ onNavigate }) {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <i className="bi bi-exclamation-triangle display-1"></i>
          <h3 className="mt-3">Hozzáférés megtagadva</h3>
          <p>Nincs jogosultságod az admin felület megtekintéséhez.</p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('home')}
          >
            Vissza a kezdőlapra
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default AdminPage;
