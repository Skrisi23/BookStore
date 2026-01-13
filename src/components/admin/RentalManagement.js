
import React, { useState, useEffect } from 'react';
import { getRentals, getBooks, getUsers, getCopies } from '../../api';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../common/LoadingSpinner';

function RentalManagement() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { success } = useToast();

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        
        
        const [rentalsData, booksData, usersData, copiesData] = await Promise.all([
          getRentals(ac.signal),
          getBooks(ac.signal),
          getUsers(ac.signal),
          getCopies(ac.signal).catch(() => []) 
        ]);

        const books = Array.isArray(booksData) ? booksData : [];
        const users = Array.isArray(usersData) ? usersData : [];
        const copies = Array.isArray(copiesData) ? copiesData : [];

        // Kölcsönzések feldolgozása és összekapcsolása
        const normalized = Array.isArray(rentalsData) ? rentalsData.map(rental => {
          // Copy ID alapján megkeressük a könyv ID-t
          const copyId = rental.copy_id;
          const copy = copies.find(c => c.id === copyId);
          const bookId = copy?.book_id || copy?.konyv_id;
          
          // Könyv adatok
          const book = books.find(b => b.id === bookId);
          const bookTitle = book?.cim || book?.title || 'N/A';
          
          // User adatok
          const userId = rental.user_id;
          const user = users.find(u => u.id === userId);
          const userName = user?.nev || user?.name || user?.username || 'N/A';

          return {
            id: rental.id,
            bookTitle,
            bookId,
            copyId,
            userName,
            userId,
            rentedDate: rental.kolcsonzes_datuma || rental.rentedDate,
            dueDate: rental.visszahozas_datuma || rental.dueDate,
            returnedDate: rental.visszahozva_datuma || rental.returnedDate || null,
            status: rental.visszahozva_datuma ? 'returned' : 'active'
          };
        }) : [];
        
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
    }
    load();
    return () => ac.abort();
  }, []);

  const handleReturn = (rentalId) => {
    // TODO: Itt backend PUT/PATCH hívás kellene a kölcsönzés lezárásához
    // Például: await fetch(`/api/Rentals/${rentalId}`, { method: 'PATCH', body: JSON.stringify({ status: 'returned', returnedDate: new Date() }) })
    
    const updatedRentals = rentals.map(rental =>
      rental.id === rentalId
        ? { ...rental, returnedDate: new Date().toISOString(), status: 'returned' }
        : rental
    );
    setRentals(updatedRentals);
    success('Könyv visszavéve!');
  };

  const getStatusBadge = (rental) => {
    if (rental.status === 'returned') {
      return <span className="badge bg-success">Visszahozva</span>;
    }
    
    const dueDate = new Date(rental.dueDate);
    const today = new Date();
    
    if (dueDate < today) {
      return <span className="badge bg-danger">Lejárt</span>;
    }
    
    return <span className="badge bg-primary">Aktív</span>;
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">
          <i className="bi bi-bookmark-check me-2"></i>
          Kölcsönzések kezelése
        </h4>

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
                  <th>Kölcsönzés dátuma</th>
                  <th>Határidő</th>
                  <th>Állapot</th>
                  <th>Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {rentals.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      Nincsenek kölcsönzések
                    </td>
                  </tr>
                ) : (
                  rentals.map(rental => (
                    <tr key={rental.id}>
                      <td>#{rental.id}</td>
                      <td>{rental.bookTitle}</td>
                      <td>{rental.userName}</td>
                      <td>{new Date(rental.rentedDate).toLocaleDateString('hu-HU')}</td>
                      <td>{new Date(rental.dueDate).toLocaleDateString('hu-HU')}</td>
                      <td>{getStatusBadge(rental)}</td>
                      <td>
                        {rental.status === 'active' && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleReturn(rental.id)}
                          >
                            <i className="bi bi-check-circle me-1"></i>
                            Visszavétel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RentalManagement;
