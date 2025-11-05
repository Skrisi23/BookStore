
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function BookCard({ book }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (type) => {
    if (!isAuthenticated) {
      alert('Kérjük jelentkezz be a művelethez!');
      return;
    }
    addToCart(book, type);
    alert(`${book.title} hozzáadva a kosárhoz (${type === 'purchase' ? 'vásárlás' : 'kölcsönzés'})`);
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={book.coverImage} 
          className="card-img-top" 
          alt={book.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{book.title}</h6>
          <p className="card-text text-muted small mb-2">
            <i className="bi bi-person me-1"></i>
            {book.author}
          </p>
          <p className="card-text text-muted small mb-2">
            <i className="bi bi-tag me-1"></i>
            {book.category}
          </p>
          <p className="card-text">
            <strong className="text-primary">{book.price.toLocaleString()} Ft</strong>
            <br />
            <small className="text-muted">Kölcsönzés: {book.rentalPrice.toLocaleString()} Ft/hó</small>
          </p>
          
          {!book.available && (
            <span className="badge bg-danger mb-2">Jelenleg nem elérhető</span>
          )}
          
          <div className="mt-auto">
            <button 
              className="btn btn-primary btn-sm w-100 mb-2"
              onClick={() => handleAddToCart('purchase')}
              disabled={!book.available}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Vásárlás
            </button>
            <button 
              className="btn btn-outline-secondary btn-sm w-100"
              onClick={() => handleAddToCart('rental')}
              disabled={!book.availableForRent}
            >
              <i className="bi bi-bookmark me-1"></i>
              Kölcsönzés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
