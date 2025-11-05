
import React from 'react';

function Statistics({ stats }) {
  return (
    <div className="row mb-4">
      <div className="col-md-3">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title">Összes könyv</h6>
                <h2 className="mb-0">{stats.totalBooks}</h2>
              </div>
              <i className="bi bi-book display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-success text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title">Aktív kölcsönzések</h6>
                <h2 className="mb-0">{stats.activeRentals}</h2>
              </div>
              <i className="bi bi-bookmark-check display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-info text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title">Felhasználók</h6>
                <h2 className="mb-0">{stats.totalUsers}</h2>
              </div>
              <i className="bi bi-people display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card bg-warning text-white">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title">Mai bevétel</h6>
                <h2 className="mb-0">{stats.todayRevenue.toLocaleString()} Ft</h2>
              </div>
              <i className="bi bi-cash-stack display-4 opacity-50"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
