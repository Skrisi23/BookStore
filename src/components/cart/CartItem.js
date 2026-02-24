
import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="card mb-3" style={{ border: '1px solid #e8e8e8' }}>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={item.book_boritokep || '/placeholder.jpg'}
              alt={item.book_cim}
              className="img-fluid"
              style={{ maxHeight: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-5">
            <h6 className="mb-1" style={{ fontWeight: 600 }}>{item.book_cim}</h6>
            <p className="small mb-0" style={{ color: '#888' }}>
              {item.author_nev}
            </p>
            <span className="badge mt-2" style={{ backgroundColor: '#1a1a1a' }}>
              Kölcsönzés
            </span>
          </div>
          <div className="col-md-3 text-end">
            <p className="mb-0 fw-bold" style={{ color: '#1a1a1a' }}>
              {item.price.toLocaleString()} Ft
            </p>
          </div>
          <div className="col-md-2 text-end">
            <button
              className="btn btn-sm"
              onClick={() => removeFromCart(item.id)}
              style={{ border: '1px solid #ccc', color: '#1a1a1a' }}
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
