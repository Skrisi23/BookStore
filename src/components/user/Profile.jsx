import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { getRentalsByUser, returnRental, changeUserPassword, deleteUser, updateUserProfile } from '../../api';
import { useNavigate } from 'react-router-dom';

function Profile() {  const { currentUser, logout, updateProfile, isAdmin } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userRentals, setUserRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Profil szerkesztés állapotok
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);  const [profileData, setProfileData] = useState({
    last_name: currentUser?.last_name || '',
    first_name: currentUser?.first_name || '',
    default_address: currentUser?.default_address || ''
  });
  
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
      error('Hiba történt a jelszó módosítása során.');
    } finally {
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
        error('Könyv visszahozva, de késve!');
      } else {
        success('Könyv sikeresen visszahozva!');
      }
      await loadUserRentals();
    } else {
      error(result.message || 'Visszahozás sikertelen');
    }
  };
  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!profileData.last_name.trim() || !profileData.first_name.trim()) {
      error('Vezetéknév és keresztnév megadása kötelező!');
      return;
    }
    setProfileLoading(true);
    try {
      const result = await updateProfile({
        LastName: profileData.last_name.trim(),
        FirstName: profileData.first_name.trim(),
        DefaultAddress: profileData.default_address.trim() || null
      });
      if (result.success) {
        success('Profil sikeresen frissítve!');
        setEditingProfile(false);
      } else {
        error(result.message || 'Profil frissítése sikertelen');
      }
    } catch (err) {
      error('Hiba történt a profil frissítése során');
    } finally {
      setProfileLoading(false);
    }
  };

  const getStatusBadge = (rental) => {
    const base = {
      padding: '0.3rem 0.8rem',
      fontSize: '0.68rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderRadius: 0,
      display: 'inline-block'
    };
    switch (rental.status) {
      case 'returned':
        return <span style={{ ...base, backgroundColor: '#e8e8e8', color: '#555' }}>Visszahozva</span>;
      case 'overdue':
        return <span style={{ ...base, backgroundColor: '#1a1a1a', color: '#fff' }}>Lejárt ({Math.abs(rental.daysLeft)} napja)</span>;
      case 'warning':
        return <span style={{ ...base, backgroundColor: '#555', color: '#fff' }}>{rental.daysLeft} nap hátra</span>;
      case 'active':
        return <span style={{ ...base, backgroundColor: '#333', color: '#fff' }}>Aktív ({rental.daysLeft} nap)</span>;
      default:
        return <span style={{ ...base, backgroundColor: '#ccc', color: '#555' }}>Ismeretlen</span>;
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

  const tabStyle = (tab) => ({
    padding: '0.6rem 1.5rem',
    fontSize: '0.78rem',
    fontWeight: activeTab === tab ? 600 : 400,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    border: 'none',
    borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent',
    backgroundColor: 'transparent',
    color: activeTab === tab ? '#1a1a1a' : '#888',
    cursor: 'pointer',
    transition: 'all 0.2s'
  });

  return (
    <div className="row g-4">
      {/* Left sidebar */}
      <div className="col-lg-3">
        {/* Profile card */}
        <div style={{ border: '1px solid #e8e8e8', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              color: '#1a1a1a',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 700
            }}>
              {currentUser?.nev?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || '?'}
            </div>
          </div>
          <div style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h5 style={{ fontWeight: 700, marginBottom: '0.3rem', fontSize: '1.1rem' }}>
              {currentUser?.nev || 'Felhasználó'}
            </h5>
            <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              {currentUser?.email || 'email@example.com'}
            </p>
            <p style={{ color: '#aaa', fontSize: '0.75rem', marginBottom: '1.5rem' }}>
              <i className="bi bi-calendar-check me-1"></i>
              Csatlakozott: {formatDate(currentUser?.letrehozva)}
            </p>
            <button
              className="btn w-100"
              style={{
                borderRadius: 0,
                border: '1px solid #1a1a1a',
                color: '#1a1a1a',
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                padding: '0.5rem'
              }}
              onClick={() => { logout(); navigate('/'); }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Kijelentkezés
            </button>
          </div>
        </div>

        {/* Stats card */}
        <div style={{ border: '1px solid #e8e8e8' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              <i className="bi bi-bar-chart me-2"></i>
              Statisztikák
            </h6>
          </div>
          <div style={{ padding: '1.2rem 1.5rem' }}>
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Aktív kölcsönzések</span>
              <strong style={{ color: '#1a1a1a' }}>{activeRentals.length}</strong>
            </div>
            {overdueRentals.length > 0 && (
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#888', fontSize: '0.85rem' }}>Lejárt</span>
                <strong style={{ color: '#1a1a1a' }}>{overdueRentals.length}</strong>
              </div>
            )}
            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Összes kölcsönzés</span>
              <strong style={{ color: '#1a1a1a' }}>{userRentals.length}</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Visszahozott</span>
              <strong style={{ color: '#1a1a1a' }}>{completedRentals.length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="col-lg-9">
        {/* Tab navigation */}
        <div style={{ borderBottom: '1px solid #e8e8e8', marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
          <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>
            <i className="bi bi-person me-1"></i> Áttekintés
          </button>
          <button style={tabStyle('rentals')} onClick={() => setActiveTab('rentals')}>
            <i className="bi bi-bookmark-check me-1"></i> Kölcsönzések
          </button>
          <button style={tabStyle('settings')} onClick={() => setActiveTab('settings')}>
            <i className="bi bi-gear me-1"></i> Beállítások
          </button>
        </div>

        {/* Áttekintés tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Profile data */}            <div style={{ border: '1px solid #e8e8e8', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
                  Profiladatok
                </h6>
                {!editingProfile && (
                  <button
                    style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}                    onClick={() => {
                      setProfileData({
                        last_name: currentUser?.last_name || '',
                        first_name: currentUser?.first_name || '',
                        default_address: currentUser?.default_address || ''
                      });
                      setEditingProfile(true);
                    }}
                  >
                    <i className="bi bi-pencil me-1"></i> Szerkesztés
                  </button>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                {editingProfile ? (
                  <form onSubmit={handleProfileSave}>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <label style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Vezetéknév</label>
                      </div>
                      <div className="col-sm-8">                        <input
                          type="text"
                          className="form-control"
                          style={{ borderRadius: 0, borderColor: '#ccc' }}
                          value={profileData.last_name}
                          onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <label style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Keresztnév</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          style={{ borderRadius: 0, borderColor: '#ccc' }}
                          value={profileData.first_name}
                          onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <label style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Lakcím</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          style={{ borderRadius: 0, borderColor: '#ccc' }}
                          value={profileData.default_address}
                          onChange={(e) => setProfileData({ ...profileData, default_address: e.target.value })}
                          placeholder="pl. 1011 Budapest, Fő utca 1."
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Email</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{currentUser?.email || 'Nincs megadva'}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Regisztráció</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{formatDate(currentUser?.letrehozva)}</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn"
                        style={{ borderRadius: 0, backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                        disabled={profileLoading}
                      >
                        {profileLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Mentés...
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
                        className="btn"
                        style={{ borderRadius: 0, border: '1px solid #ccc', backgroundColor: 'transparent', color: '#555', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                        onClick={() => setEditingProfile(false)}
                      >
                        Mégse
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Vezetéknév</span>
                      </div>                      <div className="col-sm-8">                        <span style={{ fontWeight: 500 }}>{currentUser?.last_name || (<span style={{ color: '#ccc', fontStyle: 'italic' }}>Nincs megadva</span>)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Keresztnév</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{currentUser?.first_name || (<span style={{ color: '#ccc', fontStyle: 'italic' }}>Nincs megadva</span>)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Lakcím</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{currentUser?.default_address || (<span style={{ color: '#ccc', fontStyle: 'italic' }}>Nincs megadva</span>)}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Email</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{currentUser?.email || 'Nincs megadva'}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <span style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Regisztráció</span>
                      </div>
                      <div className="col-sm-8">
                        <span style={{ fontWeight: 500 }}>{formatDate(currentUser?.letrehozva)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Active rentals preview */}
            {activeRentals.length > 0 && (
              <div style={{ border: '1px solid #e8e8e8' }}>
                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
                    Aktív kölcsönzések
                  </h6>
                  {activeRentals.length > 3 && (
                    <button
                      style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => setActiveTab('rentals')}
                    >
                      Összes →
                    </button>
                  )}
                </div>
                <div>
                  {activeRentals.slice(0, 3).map((rental, idx) => (
                    <div key={rental.id} style={{ padding: '1rem 1.5rem', borderBottom: idx < Math.min(activeRentals.length, 3) - 1 ? '1px solid #f0f0f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontWeight: 600, marginBottom: '0.2rem', fontSize: '0.9rem' }}>{rental.bookTitle}</p>
                        <p style={{ color: '#aaa', fontSize: '0.78rem', marginBottom: 0 }}>
                          Határidő: {formatDate(rental.dueDate)}
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {getStatusBadge(rental)}
                        {isAdmin() && (
                          <button
                            className="btn btn-sm"
                            style={{ borderRadius: 0, border: '1px solid #1a1a1a', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                            onClick={() => handleReturnBook(rental.id)}
                            title="Visszahozom"
                          >
                            <i className="bi bi-arrow-return-left"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kölcsönzések tab */}
        {activeTab === 'rentals' && (
          <div style={{ border: '1px solid #e8e8e8' }}>
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
              <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
                Kölcsönzési előzmények
              </h6>
            </div>
            
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: '#1a1a1a' }} role="status">
                  <span className="visually-hidden">Betöltés...</span>
                </div>
              </div>
            ) : userRentals.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox" style={{ fontSize: '2.5rem', color: '#ccc', display: 'block', marginBottom: '1rem' }}></i>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Még nincsenek kölcsönzéseid</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.8rem 1rem', border: 'none' }}>Könyv címe</th>
                      <th style={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.8rem 1rem', border: 'none' }}>Kölcsönzés</th>
                      <th style={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.8rem 1rem', border: 'none' }}>Határidő</th>
                      <th style={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.8rem 1rem', border: 'none' }}>Állapot</th>
                      {isAdmin() && <th style={{ backgroundColor: '#1a1a1a', color: '#fff', fontWeight: 500, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0.8rem 1rem', border: 'none' }}>Művelet</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {userRentals.map(rental => {
                      const isOverdue = rental.status === 'overdue';
                      const isWarning = rental.status === 'warning';
                      const tdStyle = {
                        padding: '0.8rem 1rem',
                        fontSize: '0.88rem',
                        borderBottom: '1px solid #f0f0f0',
                        backgroundColor: isOverdue ? '#1a1a1a' : isWarning ? '#dcdcdc' : 'transparent',
                        color: isOverdue ? '#fff' : '#333'
                      };
                      return (
                        <tr key={rental.id}>
                          <td style={{ ...tdStyle, fontWeight: 500 }}>{rental.bookTitle}</td>
                          <td style={tdStyle}>{formatDate(rental.rentedDate)}</td>
                          <td style={tdStyle}>{formatDate(rental.dueDate)}</td>
                          <td style={tdStyle}>{getStatusBadge(rental)}</td>
                          {isAdmin() && (
                            <td style={tdStyle}>
                              {rental.status !== 'returned' ? (
                                <button
                                  className="btn btn-sm"
                                  style={{
                                    borderRadius: 0,
                                    border: isOverdue ? '1px solid #fff' : '1px solid #1a1a1a',
                                    backgroundColor: isOverdue ? '#fff' : '#1a1a1a',
                                    color: isOverdue ? '#1a1a1a' : '#fff',
                                    fontSize: '0.72rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.5px',
                                    textTransform: 'uppercase',
                                    padding: '0.3rem 0.8rem'
                                  }}
                                  onClick={() => handleReturnBook(rental.id)}
                                >
                                  <i className="bi bi-arrow-return-left me-1"></i>
                                  Visszahozom
                                </button>
                              ) : (
                                <span style={{ color: isOverdue ? '#aaa' : '#aaa', fontSize: '0.82rem' }}>{formatDate(rental.returnedDate)}</span>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Beállítások tab */}
        {activeTab === 'settings' && (
          <div>
            {/* Security */}
            <div style={{ border: '1px solid #e8e8e8', marginBottom: '1.5rem' }}>
              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
                <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
                  <i className="bi bi-shield-lock me-2"></i>
                  Biztonság
                </h6>
              </div>
              <div style={{ padding: '1.5rem' }}>
                {!showPasswordChange ? (
                  <button 
                    className="btn"
                    style={{ borderRadius: 0, border: '1px solid #1a1a1a', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                    onClick={() => setShowPasswordChange(true)}
                  >
                    <i className="bi bi-key me-2"></i>
                    Jelszó módosítása
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                      <label style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', marginBottom: '0.4rem', display: 'block' }}>Jelenlegi jelszó</label>
                      <input
                        type="password"
                        className="form-control"
                        style={{ borderRadius: 0, borderColor: '#ccc' }}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', marginBottom: '0.4rem', display: 'block' }}>Új jelszó</label>
                      <input
                        type="password"
                        className="form-control"
                        style={{ borderRadius: 0, borderColor: '#ccc' }}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                        minLength={6}
                      />
                      <small style={{ color: '#aaa', fontSize: '0.75rem' }}>Legalább 6 karakter hosszú legyen</small>
                    </div>
                    <div className="mb-3">
                      <label style={{ fontSize: '0.78rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#888', marginBottom: '0.4rem', display: 'block' }}>Új jelszó megerősítése</label>
                      <input
                        type="password"
                        className="form-control"
                        style={{ borderRadius: 0, borderColor: '#ccc' }}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn"
                        style={{ borderRadius: 0, backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                        disabled={passwordLoading}
                      >
                        {passwordLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Mentés...
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
                        className="btn"
                        style={{ borderRadius: 0, border: '1px solid #ccc', backgroundColor: 'transparent', color: '#555', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
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

            {/* Danger zone */}
            <div style={{ border: '1px solid #e8e8e8' }}>
              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
                <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Veszélyes zóna
                </h6>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: '#888', fontSize: '0.88rem', marginBottom: '1rem' }}>
                  A fiók törlése végleges és visszavonhatatlan művelet. Minden adat véglegesen törlésre kerül.
                </p>
                <button
                  className="btn"
                  style={{ borderRadius: 0, border: '1px solid #1a1a1a', color: '#1a1a1a', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                  disabled={deleteLoading}
                  onClick={async () => {
                    if (!window.confirm('Biztosan törölni szeretnéd a fiókodat? Ez a művelet visszavonhatatlan!')) return;
                    if (!window.confirm('UTOLSÓ FIGYELMEZTETÉS: Minden adatod véglegesen törlésre kerül. Folytatod?')) return;
                    setDeleteLoading(true);
                    try {
                      const result = await deleteUser(currentUser.id);
                      if (result.success) {
                        success('Fiók sikeresen törölve.');
                        logout();
                        navigate('/');
                      } else {
                        error(result.message || 'Fiók törlése sikertelen.');
                      }
                    } catch (err) {
                      error('Hiba történt a fiók törlése során.');
                    } finally {
                      setDeleteLoading(false);
                    }
                  }}
                >
                  {deleteLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Törlés...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash me-2"></i>
                      Fiók törlése
                    </>
                  )}
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
