import React, { useState, useEffect } from 'react';
import { getRentals, returnRental } from '../../api';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../common/LoadingSpinner';

function RentalManagement() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, overdue, returned
  const { success, error: toastError } = useToast();

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
    const result = await returnRental(rentalId);
    if (result.success) {
      if (result.was_late) {
        success('Könyv visszavéve (késve érkezett!) 🕐');
      } else {
        success('Könyv sikeresen visszavéve! ✅');
      }
      await loadRentals();
    } else {
      toastError(result.message || 'Visszavétel sikertelen');
    }
  };

  const getStatusBadge = (rental) => {
    switch (rental.status) {
      case 'returned':
        return <span className="badge bg-success">✅ Visszahozva</span>;
      case 'overdue':
        return <span className="badge bg-danger">❌ Lejárt ({Math.abs(rental.daysLeft)} napja)</span>;
      case 'warning':
        return <span className="badge bg-warning text-dark">⚠️ {rental.daysLeft} nap hátra</span>;
      case 'active':
        return <span className="badge bg-primary">📖 Aktív ({rental.daysLeft} nap)</span>;
      default:
        return <span className="badge bg-secondary">Ismeretlen</span>;
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
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="card-title mb-0">
            <i className="bi bi-bookmark-check me-2"></i>
            Kölcsönzések kezelése
          </h4>
        </div>

        {/* Statisztikák */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white" style={{cursor: 'pointer'}} onClick={() => setFilter('all')}>
              <div className="card-body py-2 text-center">
                <small>Összesen</small>
                <h4 className="mb-0">{rentals.length}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white" style={{cursor: 'pointer'}} onClick={() => setFilter('active')}>
              <div className="card-body py-2 text-center">
                <small>Aktív</small>
                <h4 className="mb-0">{activeCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white" style={{cursor: 'pointer'}} onClick={() => setFilter('overdue')}>
              <div className="card-body py-2 text-center">
                <small>Lejárt</small>
                <h4 className="mb-0">{overdueCount}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white" style={{cursor: 'pointer'}} onClick={() => setFilter('returned')}>
              <div className="card-body py-2 text-center">
                <small>Visszahozva</small>
                <h4 className="mb-0">{returnedCount}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Szűrő jelzés */}
        {filter !== 'all' && (
          <div className="alert alert-info py-2 d-flex justify-content-between align-items-center">
            <small>Szűrve: <strong>{filter === 'active' ? 'Aktív' : filter === 'overdue' ? 'Lejárt' : 'Visszahozva'}</strong> ({filteredRentals.length} találat)</small>
            <button className="btn btn-sm btn-outline-info" onClick={() => setFilter('all')}>Szűrő törlése</button>
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
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Könyv</th>
                  <th>Felhasználó</th>
                  <th>Email</th>
                  <th>Kölcsönzés</th>
                  <th>Határidő</th>
                  <th>Állapot</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.map(rental => (
                  <tr key={rental.id} className={rental.status === 'overdue' ? 'table-danger' : rental.status === 'warning' ? 'table-warning' : ''}>
                    <td>#{rental.id}</td>
                    <td>{rental.bookTitle}</td>
                    <td>{rental.userName}</td>
                    <td><small className="text-muted">{rental.userEmail}</small></td>
                    <td>{new Date(rental.rentedDate).toLocaleDateString('hu-HU')}</td>
                    <td>{rental.dueDate ? new Date(rental.dueDate).toLocaleDateString('hu-HU') : 'N/A'}</td>
                    <td>{getStatusBadge(rental)}</td>
                    <td>
                      {rental.status !== 'returned' && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleReturn(rental.id)}
                        >
                          <i className="bi bi-check-circle me-1"></i>
                          Visszavétel
                        </button>
                      )}
                      {rental.status === 'returned' && rental.returnedDate && (
                        <small className="text-muted">{new Date(rental.returnedDate).toLocaleDateString('hu-HU')}</small>
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
  );
}

export default RentalManagement;
