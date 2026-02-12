
import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  const book = item.copy?.book || {};
  const price = book.rental_price || 0;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={book.book_cover || '/placeholder.jpg'}
              alt={book.title}
              className="img-fluid rounded"
              style={{ maxHeight: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-5">
            <h6 className="mb-1">{book.title}</h6>
            <p className="text-muted small mb-0">
              <i className="bi bi-person me-1"></i>
              {book.author}
            </p>
            <span className="badge bg-secondary mt-2">
              Kölcsönzés
            </span>
          </div>
          <div className="col-md-3 text-end">
            <p className="mb-0 fw-bold text-primary">
              {price.toLocaleString()} Ft
            </p>
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.cart_item_id)}
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
