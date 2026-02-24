import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart, addToCart } = useCart();

  const isPurchase = item.order_type === 'purchase';
  const badgeLabel = isPurchase ? 'Vásárlás' : 'Kölcsönzés';
  const badgeStyle = isPurchase
    ? { backgroundColor: '#198754', color: '#fff' }
    : { backgroundColor: '#1a1a1a', color: '#fff' };

  const handleIncrement = async () => {
    if (!isPurchase) return;
    await addToCart(item.book_id, 'purchase', 1);
  };

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
          <div className="col-md-4">
            <h6 className="mb-1" style={{ fontWeight: 600 }}>{item.book_cim}</h6>
            <p className="small mb-0" style={{ color: '#888' }}>
              {item.author_nev}
            </p>
            <span className="badge mt-2" style={badgeStyle}>
              {badgeLabel}
            </span>
          </div>
          <div className="col-md-2 text-center">
            {isPurchase ? (
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="fw-semibold">{item.quantity} db</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleIncrement}
                  title="Mennyiség növelése"
                  style={{ lineHeight: 1, padding: '2px 8px' }}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            ) : (
              <span className="text-muted small">{item.quantity} db</span>
            )}
          </div>
          <div className="col-md-2 text-end">
            <p className="mb-0 fw-bold" style={{ color: '#1a1a1a' }}>
              {(item.price * item.quantity).toLocaleString()} Ft
            </p>
            {item.quantity > 1 && (
              <small className="text-muted">{item.price.toLocaleString()} Ft/db</small>
            )}
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
