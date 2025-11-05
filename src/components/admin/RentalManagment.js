
import React, { useState, useEffect } from 'react';
import { mockRentals } from '../../data/mockData';

function RentalManagement() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Betöltjük a kölcsönzéseket localStorage-ból vagy mock adatokból
    const savedRentals = localStorage.getItem('rentals');
    setRentals(savedRentals ? JSON.parse(savedRentals) : mockRentals);
  }, []);

  const handleReturn = (rentalId) => {
    const updatedRentals = rentals.map(rental =>
      rental.id === rentalId
        ? { ...rental, returnedDate: new Date().toISOString(), status: 'returned' }
        : rental
    );
    setRentals(updatedRentals);
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));
    alert('Könyv visszavéve!');
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
              {rentals.map(rental => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RentalManagement;
