
import React from 'react';

function Statistics({ stats }) {
  return (
    <div className="row mb-4">
      <div className="col-md-3">
        <div className="card" style={{ backgroundColor: '#1a1a1a', color: '#fff', border: 'none' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Összes könyv</h6>
                <h2 className="mb-0" style={{ fontWeight: 700 }}>{stats.totalBooks}</h2>
              </div>
              <i className="bi bi-book display-4" style={{ opacity: 0.15 }}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card" style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Aktív kölcsönzések</h6>
                <h2 className="mb-0" style={{ fontWeight: 700 }}>{stats.activeRentals}</h2>
              </div>
              <i className="bi bi-bookmark-check display-4" style={{ opacity: 0.15 }}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card" style={{ backgroundColor: '#555', color: '#fff', border: 'none' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Felhasználók</h6>
                <h2 className="mb-0" style={{ fontWeight: 700 }}>{stats.totalUsers}</h2>
              </div>
              <i className="bi bi-people display-4" style={{ opacity: 0.15 }}></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card" style={{ backgroundColor: '#f5f5f5', color: '#1a1a1a', border: '1px solid #e8e8e8' }}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title" style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888' }}>Mai bevétel</h6>
                <h2 className="mb-0" style={{ fontWeight: 700 }}>{stats.todayRevenue.toLocaleString()} Ft</h2>
              </div>
              <i className="bi bi-cash-stack display-4" style={{ opacity: 0.1 }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
