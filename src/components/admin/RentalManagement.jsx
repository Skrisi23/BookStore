import React, { useState, useEffect } from 'react';
import { getRentals, returnRental, sendRentalReminder, sendCustomEmail, sendRentalNotifications } from '../../api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

function RentalManagement() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sendingEmail, setSendingEmail] = useState(null); // rental ID ami éppen küld
  const [sendingNotifications, setSendingNotifications] = useState(false);
  const { success, error: toastError } = useToast();
  const { currentUser } = useAuth();

  // Custom email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailForm, setEmailForm] = useState({
    toEmail: '',
    toName: '',
    subject: '',
    message: ''
  });
  const [sendingCustomEmail, setSendingCustomEmail] = useState(false);

  const loadRentals = async () => {
    try {
      setLoading(true);
      const rentalsData = await getRentals();
      const rentalsArray = Array.isArray(rentalsData) ? rentalsData : [];

      const normalized = rentalsArray.map(rental => {
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
          bookId: rental.book_id,
          copyId: rental.copy_id,
          userName: rental.user_name || 'N/A',
          userEmail: rental.user_email || 'N/A',
          userId: rental.user_id,
          rentedDate: rental.kolcsonzes_datuma,
          dueDate: dueDate,
          returnedDate: rental.visszahozva_datuma,
          status: statusType,
          daysLeft: daysLeft
        };
      });

      setRentals(normalized);
      setError(null);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Kölcsönzések betöltése sikertelen:', e);
        setError(e.message || 'Nem sikerült betölteni a kölcsönzéseket');
        setRentals([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const handleReturn = async (rentalId) => {
    const result = await returnRental(rentalId, currentUser?.id);
    if (result.success) {
      if (result.was_late) {
        success('Könyv visszavéve (késve érkezett!)');
      } else {
        success('Könyv sikeresen visszavéve!');
      }
      await loadRentals();
    } else {
      toastError(result.message || 'Visszavétel sikertelen');
    }
  };

  const handleSendReminder = async (rental) => {
    setSendingEmail(rental.id);
    const result = await sendRentalReminder(rental.id);
    if (result.success) {
      success(result.message);
    } else {
      toastError(result.message || 'Email küldés sikertelen');
    }
    setSendingEmail(null);
  };

  const handleSendNotifications = async () => {
    setSendingNotifications(true);
    const result = await sendRentalNotifications();
    if (result.success) {
      success(`Értesítések elküldve: ${result.reminders_sent || 0} emlékeztető, ${result.overdue_sent || 0} lejárt`);
    } else {
      toastError(result.message || 'Értesítések küldése sikertelen');
    }
    setSendingNotifications(false);
  };

  const openCustomEmailModal = (rental) => {
    setEmailForm({
      toEmail: rental ? rental.userEmail : '',
      toName: rental ? rental.userName : '',
      subject: rental ? `Kölcsönzés - ${rental.bookTitle}` : '',
      message: ''
    });
    setShowEmailModal(true);
  };

  const handleSendCustomEmail = async (e) => {
    e.preventDefault();
    setSendingCustomEmail(true);

    const result = await sendCustomEmail({
      toEmail: emailForm.toEmail,
      toName: emailForm.toName,
      subject: emailForm.subject,
      message: emailForm.message
    });

    if (result.success) {
      success(result.message);
      setShowEmailModal(false);
      setEmailForm({ toEmail: '', toName: '', subject: '', message: '' });
    } else {
      toastError(result.message || 'Email küldés sikertelen');
    }
    setSendingCustomEmail(false);
  };

  const getStatusBadge = (rental) => {
    switch (rental.status) {
      case 'returned':
        return <span className="badge" style={{ backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ccc' }}>Visszahozva</span>;
      case 'overdue':
        return <span className="badge" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>Lejárt ({Math.abs(rental.daysLeft)} napja)</span>;
      case 'warning':
        return <span className="badge" style={{ backgroundColor: '#555', color: '#fff' }}>{rental.daysLeft} nap hátra</span>;
      case 'active':
        return <span className="badge" style={{ backgroundColor: '#333', color: '#fff' }}>Aktív ({rental.daysLeft} nap)</span>;
      default:
        return <span className="badge" style={{ backgroundColor: '#888', color: '#fff' }}>Ismeretlen</span>;
    }
  };

  const filteredRentals = rentals.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'active') return r.status === 'active' || r.status === 'warning';
    if (filter === 'overdue') return r.status === 'overdue';
    if (filter === 'returned') return r.status === 'returned';
    return true;
  });

  const overdueCount = rentals.filter(r => r.status === 'overdue').length;
  const activeCount = rentals.filter(r => r.status === 'active' || r.status === 'warning').length;
  const returnedCount = rentals.filter(r => r.status === 'returned').length;

  return (
    <div className="card" style={{ border: '1px solid #e8e8e8', borderRadius: 0, boxShadow: 'none' }}>
      <div className="card-body">

        {/* Statisztikák */}
        <div className="row mb-3">
          <div className="col-md-3">
            <div className="card" style={{cursor: 'pointer', backgroundColor: '#1a1a1a', color: '#fff', border: filter === 'all' ? '2px solid #fff' : 'none', transition: 'all 0.2s'}} onClick={() => setFilter('all')}>
              <div className="card-body py-2 text-center">
                <small style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Összesen</small>
                <h4 className="mb-0" style={{ fontWeight: 700 }}>{rentals.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{cursor: 'pointer', backgroundColor: '#333', color: '#fff', border: filter === 'active' ? '2px solid #fff' : 'none', transition: 'all 0.2s'}} onClick={() => setFilter('active')}>
              <div className="card-body py-2 text-center">
                <small style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Aktív</small>
                <h4 className="mb-0" style={{ fontWeight: 700 }}>{activeCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{cursor: 'pointer', backgroundColor: '#555', color: '#fff', border: filter === 'overdue' ? '2px solid #fff' : 'none', transition: 'all 0.2s'}} onClick={() => setFilter('overdue')}>
              <div className="card-body py-2 text-center">
                <small style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Lejárt</small>
                <h4 className="mb-0" style={{ fontWeight: 700 }}>{overdueCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card" style={{cursor: 'pointer', backgroundColor: '#f5f5f5', color: '#1a1a1a', border: filter === 'returned' ? '2px solid #1a1a1a' : '1px solid #e8e8e8', transition: 'all 0.2s'}} onClick={() => setFilter('returned')}>
              <div className="card-body py-2 text-center">
                <small style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', opacity: 0.7 }}>Visszahozva</small>
                <h4 className="mb-0" style={{ fontWeight: 700 }}>{returnedCount}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end align-items-center mb-4">
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-dark"
              onClick={() => openCustomEmailModal(null)}
            >
              <i className="bi bi-envelope-plus me-1"></i>
              Egyéni email
            </button>
            <button
              className="btn btn-dark"
              onClick={handleSendNotifications}
              disabled={sendingNotifications}
            >
              {sendingNotifications ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1"></span>
                  Küldés...
                </>
              ) : (
                <>
                  <i className="bi bi-bell me-1"></i>
                  Összes értesítés
                </>
              )}
            </button>
          </div>
        </div>

        {/* Szűrő jelzés */}
        {filter !== 'all' && (
          <div className="py-2 px-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f5f5f5', border: '1px solid #e8e8e8' }}>
            <small>Szűrve: <strong>{filter === 'active' ? 'Aktív' : filter === 'overdue' ? 'Lejárt' : 'Visszahozva'}</strong> ({filteredRentals.length} találat)</small>
            <button className="btn btn-sm btn-outline-dark" onClick={() => setFilter('all')}>Szűrő törlése</button>
          </div>
        )}

        {(loading || rentals.length === 0) && !error && (
          <LoadingSpinner fullPage text="Kölcsönzések betöltése..." />
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {!loading && !error && rentals.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle" style={{ fontSize: '0.9rem' }}>
              <thead style={{ backgroundColor: '#f8f8f8' }}>
                <tr>
                  <th style={{ fontWeight: 600 }}>ID</th>
                  <th style={{ fontWeight: 600 }}>Könyv</th>
                  <th style={{ fontWeight: 600 }}>Felhasználó</th>
                  <th style={{ fontWeight: 600 }}>Email</th>
                  <th style={{ fontWeight: 600 }}>Kölcsönzés</th>
                  <th style={{ fontWeight: 600 }}>Határidő</th>
                  <th style={{ fontWeight: 600 }}>Állapot</th>
                  <th style={{ fontWeight: 600 }}>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.map(rental => {
                  const isOverdue = rental.status === 'overdue';
                  const isWarning = rental.status === 'warning' || (rental.daysLeft !== null && rental.daysLeft <= 2 && rental.status !== 'returned');
                  const rowBg = isOverdue
                    ? '#1a1a1a'
                    : isWarning
                      ? '#dcdcdc'
                      : null;
                  const textColor = isOverdue ? '#fff' : undefined;
                  const tdStyle = rowBg ? { backgroundColor: rowBg, color: textColor } : {};
                  return (
                  <tr key={rental.id}>
                    <td style={tdStyle}>
                      <span style={{ backgroundColor: isOverdue ? '#fff' : '#1a1a1a', color: isOverdue ? '#1a1a1a' : '#fff', padding: '2px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {rental.id}
                      </span>
                    </td>
                    <td style={tdStyle}>{rental.bookTitle}</td>
                    <td style={tdStyle}>{rental.userName}</td>
                    <td style={tdStyle}><small style={isOverdue ? { color: '#ccc' } : { color: '#6c757d' }}>{rental.userEmail}</small></td>
                    <td style={tdStyle}>{new Date(rental.rentedDate).toLocaleDateString('hu-HU')}</td>
                    <td style={tdStyle}>{rental.dueDate ? new Date(rental.dueDate).toLocaleDateString('hu-HU') : 'N/A'}</td>
                    <td style={tdStyle}>{getStatusBadge(rental)}</td>
                    <td style={tdStyle}>
                      <div className="d-flex gap-1">
                        {rental.status !== 'returned' && (
                          <>
                            <button
                              className={`btn btn-sm ${isOverdue ? 'btn-light' : 'btn-dark'}`}
                              onClick={() => handleReturn(rental.id)}
                              title="Visszavétel"
                            >
                              <i className="bi bi-check-circle"></i>
                            </button>
                            <button
                              className={`btn btn-sm ${isOverdue ? 'btn-outline-light' : 'btn-outline-dark'}`}
                              onClick={() => handleSendReminder(rental)}
                              disabled={sendingEmail === rental.id}
                              title="Felszólító email"
                            >
                              {sendingEmail === rental.id ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <i className="bi bi-envelope-exclamation"></i>
                              )}
                            </button>
                            <button
                              className={`btn btn-sm ${isOverdue ? 'btn-outline-light' : 'btn-outline-secondary'}`}
                              onClick={() => openCustomEmailModal(rental)}
                              title="Egyéni email küldése"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                          </>
                        )}
                        {rental.status === 'returned' && rental.returnedDate && (
                          <small className="text-muted">{new Date(rental.returnedDate).toLocaleDateString('hu-HU')}</small>
                        )}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Email Modal */}
      {showEmailModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-envelope me-2"></i>
                  Egyéni email küldése
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEmailModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSendCustomEmail}>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Címzett email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={emailForm.toEmail}
                        onChange={(e) => setEmailForm({...emailForm, toEmail: e.target.value})}
                        required
                        placeholder="pelda@email.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Címzett neve</label>
                      <input
                        type="text"
                        className="form-control"
                        value={emailForm.toName}
                        onChange={(e) => setEmailForm({...emailForm, toName: e.target.value})}
                        placeholder="Felhasználó neve"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tárgy *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                      required
                      placeholder="Email tárgya..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Üzenet *</label>
                    <textarea
                      className="form-control"
                      rows="6"
                      value={emailForm.message}
                      onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                      required
                      placeholder="Írd ide az üzeneted..."
                    ></textarea>
                    <small className="form-text text-muted">
                      Az üzenet automatikusan BookStore fejléccel és aláírással lesz elküldve.
                    </small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEmailModal(false)}
                  >
                    Mégse
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={sendingCustomEmail}
                  >
                    {sendingCustomEmail ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1"></span>
                        Küldés...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-1"></i>
                        Küldés
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentalManagement;
