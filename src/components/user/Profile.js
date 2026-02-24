import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getRentalsByUser, returnRental, changeUserPassword } from '../../api';

function Profile() {
  const { currentUser, logout } = useAuth();
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Jelszó csere állapotok
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadUserRentals();
  }, []);
  const loadUserRentals = async () => {
    try {
      setLoading(true);
      const rentalsData = await getRentalsByUser(currentUser?.id);
      const rentals = Array.isArray(rentalsData) ? rentalsData : [];

      const myRentals = rentals.map(rental => {
        const dueDate = rental.lejarat_datum;
        const today = new Date().toISOString().split('T')[0];
        const isReturned = !!rental.visszahozva_datuma;
        
        let daysLeft = null;
        let statusType = 'active';
        
        if (isReturned) {
          statusType = 'returned';
        } else if (dueDate) {
          const due = new Date(dueDate);
          const now = new Date(today);
          daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
          
          if (daysLeft < 0) {
            statusType = 'overdue';
          } else if (daysLeft <= 3) {
            statusType = 'warning';
          } else {
            statusType = 'active';
          }
        }

        return {
          id: rental.id,
          bookTitle: rental.book_title || 'N/A',
          rentedDate: rental.kolcsonzes_datuma,
          dueDate: dueDate,
          returnedDate: rental.visszahozva_datuma,
          status: statusType,
          daysLeft: daysLeft
        };
      });

      setUserRentals(myRentals);
    } catch (e) {
      console.error('Kölcsönzések betöltése sikertelen:', e);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      error('Az új jelszavak nem egyeznek!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      error('Az új jelszónak legalább 6 karakter hosszúnak kell lennie!');
      return;
    }

    if (!currentUser?.id) {
      error('A jelszó módosításához be kell jelentkezned.');
      return;
    }

    setPasswordLoading(true);
    try {
      const result = await changeUserPassword(
        currentUser.id,
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!result.success) {
        error(result.message || 'A jelszó módosítása sikertelen.');
        return;
      }

      success(result.message || 'Jelszó sikeresen módosítva!');
      setShowPasswordChange(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Jelszó módosítási hiba:', err);
      error('Hiba történt a jelszó módosítása során.');    } finally {
      setPasswordLoading(false);
    }
  };

  const handleReturnBook = async (rentalId) => {
    if (!window.confirm('Biztosan visszahoztad ezt a könyvet?')) {
      return;
    }

    const result = await returnRental(rentalId);
    if (result.success) {
      if (result.was_late) {
        error('Könyv visszahozva, de késve! 🕐');
      } else {
        success('Könyv sikeresen visszahozva! ✅');
      }
      await loadUserRentals();
    } else {
      error(result.message || 'Visszahozás sikertelen');
    }
  };

  const getStatusBadge = (rental) => {
    switch (rental.status) {
      case 'returned':
        return <span className="badge bg-success">✅ Visszahozva</span>;
      case 'overdue':
        return <span className="badge bg-danger">❌ Lejárt ({Math.abs(rental.daysLeft)} napja)</span>;
      case 'warning':
        return <span className="badge bg-warning text-dark">⚠️ {rental.daysLeft} nap van hátra</span>;
      case 'active':
        return <span className="badge bg-primary">📖 Aktív ({rental.daysLeft} nap hátra)</span>;
      default:
        return <span className="badge bg-secondary">Ismeretlen</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'N/A';
    }
  };
  const activeRentals = userRentals.filter(r => r.status === 'active' || r.status === 'warning' || r.status === 'overdue');
  const overdueRentals = userRentals.filter(r => r.status === 'overdue');
  const completedRentals = userRentals.filter(r => r.status === 'returned');

  return (
    <div className="row">
      <div className="col-md-3">
        {/* Profil kártya */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <div className="mb-3">
              <div 
                className="d-inline-flex align-items-center justify-content-center"
                style={{ width: '80px', height: '80px', fontSize: '2rem', backgroundColor: '#1a1a1a', color: '#fff' }}
              >
                {currentUser?.nev?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || '?'}
              </div>
            </div>
            <h5 className="card-title mb-1">{currentUser?.nev || 'Felhasználó'}</h5>
            <p className="text-muted small mb-2">{currentUser?.email || 'email@example.com'}</p>
            <p className="text-muted small">
              <i className="bi bi-calendar-check me-1"></i>
              Csatlakozott: {formatDate(currentUser?.letrehozva)}
            </p>
            <hr />
            <button className="btn btn-outline-danger btn-sm w-100" onClick={logout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Kijelentkezés
            </button>
          </div>
        </div>

        {/* Statisztikák kártya */}
        <div className="card">
          <div className="card-body">
            <h6 className="card-title mb-3">
              <i className="bi bi-bar-chart me-2"></i>
              Statisztikák
            </h6>            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">Aktív kölcsönzések:</small>
              <strong className="text-primary">{activeRentals.length}</strong>
            </div>
            {overdueRentals.length > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <small className="text-muted">Lejárt:</small>
                <strong className="text-danger">{overdueRentals.length}</strong>
              </div>
            )}
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">Összes kölcsönzés:</small>
              <strong>{userRentals.length}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <small className="text-muted">Visszahozott:</small>
              <strong className="text-success">{completedRentals.length}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-9">
        {/* Tab navigáció */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="bi bi-person me-2"></i>
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
              className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <i className="bi bi-gear me-2"></i>
              Beállítások
            </button>
          </li>
        </ul>

        {/* Áttekintés tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Profiladatok
                </h5>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Név:</strong>
                  </div>
                  <div className="col-sm-8">
                    {currentUser?.nev || 'Nincs megadva'}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Email cím:</strong>
                  </div>
                  <div className="col-sm-8">
                    {currentUser?.email || 'Nincs megadva'}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Regisztráció dátuma:</strong>
                  </div>
                  <div className="col-sm-8">
                    {formatDate(currentUser?.letrehozva)}
                  </div>
                </div>
              </div>
            </div>            {activeRentals.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-bookmark-star me-2"></i>
                    Aktív kölcsönzések
                  </h5>
                  <div className="list-group">
                    {activeRentals.slice(0, 3).map(rental => (
                      <div key={rental.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{rental.bookTitle}</h6>
                            <small className="text-muted">
                              Kölcsönözve: {formatDate(rental.rentedDate)} | Határidő: {formatDate(rental.dueDate)}
                            </small>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            {getStatusBadge(rental)}
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => handleReturnBook(rental.id)}
                              title="Visszahozom"
                            >
                              <i className="bi bi-arrow-return-left"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activeRentals.length > 3 && (
                    <button 
                      className="btn btn-link btn-sm mt-2"
                      onClick={() => setActiveTab('rentals')}
                    >
                      Összes megtekintése →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kölcsönzések tab */}
        {activeTab === 'rentals' && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">
                <i className="bi bi-bookmark-check me-2"></i>
                Kölcsönzési előzmények
              </h5>
              
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Betöltés...</span>
                  </div>
                </div>
              ) : userRentals.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem' }}></i>
                  <p className="mt-3">Még nincsenek kölcsönzéseid</p>
                </div>
              ) : (                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Könyv címe</th>
                        <th>Kölcsönzés dátuma</th>
                        <th>Határidő</th>
                        <th>Állapot</th>
                        <th>Művelet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRentals.map(rental => (
                        <tr key={rental.id} className={rental.status === 'overdue' ? 'table-danger' : rental.status === 'warning' ? 'table-warning' : ''}>
                          <td>{rental.bookTitle}</td>
                          <td>{formatDate(rental.rentedDate)}</td>
                          <td>{formatDate(rental.dueDate)}</td>
                          <td>{getStatusBadge(rental)}</td>
                          <td>
                            {rental.status !== 'returned' && (
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleReturnBook(rental.id)}
                              >
                                <i className="bi bi-arrow-return-left me-1"></i>
                                Visszahozom
                              </button>
                            )}
                            {rental.status === 'returned' && (
                              <small className="text-muted">{formatDate(rental.returnedDate)}</small>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Beállítások tab */}
        {activeTab === 'settings' && (
          <div>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-shield-lock me-2"></i>
                  Biztonság
                </h5>
                
                {!showPasswordChange ? (
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setShowPasswordChange(true)}
                  >
                    <i className="bi bi-key me-2"></i>
                    Jelszó módosítása
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                      <label className="form-label">Jelenlegi jelszó</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Új jelszó</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                        minLength={6}
                      />
                      <small className="text-muted">Legalább 6 karakter hosszú legyen</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Új jelszó megerősítése</label>
                      <input
                        type="password"
                        className="form-control"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                        {passwordLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Mentés folyamatban...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Mentés
                          </>
                        )}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={() => {
                          setShowPasswordChange(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                          });
                        }}
                      >
                        Mégse
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-danger mb-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Fiók törlése
                </h5>
                <p className="text-muted">
                  A fiók törlése végleges és visszavonhatatlan művelet. Minden adat véglegesen törlésre kerül.
                </p>
                <button className="btn btn-outline-danger" disabled>
                  <i className="bi bi-trash me-2"></i>
                  Fiók törlése
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
