
import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={item.book_boritokep || '/placeholder.jpg'}
              alt={item.book_cim}
              className="img-fluid rounded"
              style={{ maxHeight: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-5">
            <h6 className="mb-1">{item.book_cim}</h6>
            <p className="text-muted small mb-0">
              <i className="bi bi-person me-1"></i>
              {item.author_nev}
            </p>
            <span className="badge bg-secondary mt-2">
              Kölcsönzés
            </span>
          </div>
          <div className="col-md-3 text-end">
            <p className="mb-0 fw-bold text-primary">
              {item.price.toLocaleString()} Ft
            </p>
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.id)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
