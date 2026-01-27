import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getRentals, getBooks, getCopies } from '../../api';

function Profile() {
  const { currentUser, logout } = useAuth();
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      // Backend-ről próbálunk kölcsönzéseket lekérni
      try {
        const [rentalsData, booksData, copiesData] = await Promise.all([
          getRentals().catch(() => []),
          getBooks().catch(() => []),
          getCopies().catch(() => [])
        ]);

        const rentals = Array.isArray(rentalsData) ? rentalsData : [];
        const books = Array.isArray(booksData) ? booksData : [];
        const copies = Array.isArray(copiesData) ? copiesData : [];

        // Szűrjük a current user kölcsönzéseit
        const myRentals = rentals
          .filter(r => r.user_id === currentUser?.id)
          .map(rental => {
            const copy = copies.find(c => c.id === rental.copy_id);
            const book = books.find(b => b.id === copy?.book_id);
            return {
              id: rental.id,
              bookTitle: book?.cim || 'N/A',
              rentedDate: rental.kolcsonzes_datuma,
              dueDate: rental.visszahozas_datuma,
              returnedDate: rental.visszahozva_datuma,
              status: rental.visszahozva_datuma ? 'returned' : 'active'
            };
          });

        setUserRentals(myRentals);
      } catch (e) {
        console.error('Backend kölcsönzések betöltése sikertelen:', e);
      }
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

    // TODO: Backend API hívás a jelszó módosításhoz
    // await updatePassword(currentUser.id, passwordData.currentPassword, passwordData.newPassword);
    
    success('Jelszó sikeresen módosítva! (Demo verzió - backend később)');
    setShowPasswordChange(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
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

  const activeRentals = userRentals.filter(r => r.status === 'active');
  const completedRentals = userRentals.filter(r => r.status === 'returned');

  return (
    <div className="row">
      <div className="col-md-3">
        {/* Profil kártya */}
        <div className="card mb-4">
          <div className="card-body text-center">
            <div className="mb-3">
              <div 
                className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                style={{ width: '80px', height: '80px', fontSize: '2rem' }}
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
            </h6>
            <div className="d-flex justify-content-between mb-2">
              <small className="text-muted">Aktív kölcsönzések:</small>
              <strong className="text-primary">{activeRentals.length}</strong>
            </div>
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
            </div>

            {activeRentals.length > 0 && (
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
                              Kölcsönözve: {formatDate(rental.rentedDate)}
                            </small>
                          </div>
                          <span className="badge bg-primary">Aktív</span>
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
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Könyv címe</th>
                        <th>Kölcsönzés dátuma</th>
                        <th>Határidő</th>
                        <th>Állapot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRentals.map(rental => (
                        <tr key={rental.id}>
                          <td>{rental.bookTitle}</td>
                          <td>{formatDate(rental.rentedDate)}</td>
                          <td>{formatDate(rental.dueDate)}</td>
                          <td>
                            {rental.status === 'active' ? (
                              <span className="badge bg-primary">Aktív</span>
                            ) : (
                              <span className="badge bg-success">Visszahozva</span>
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
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i>
                        Mentés
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
