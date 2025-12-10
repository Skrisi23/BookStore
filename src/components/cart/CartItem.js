
import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, item.type, newQuantity);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img
              src={item.coverImage}
              alt={item.title}
              className="img-fluid rounded"
              style={{ maxHeight: '100px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-4">
            <h6 className="mb-1">{item.title}</h6>
            <p className="text-muted small mb-0">
              <i className="bi bi-person me-1"></i>
              {item.author}
            </p>
            <span className={`badge ${item.type === 'purchase' ? 'bg-primary' : 'bg-secondary'} mt-2`}>
              {item.type === 'purchase' ? 'Vásárlás' : 'Kölcsönzés'}
            </span>
          </div>
          <div className="col-md-3">
            <div className="input-group input-group-sm">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={item.quantity}
                readOnly
                style={{ maxWidth: '50px' }}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div className="col-md-2 text-end">
            <p className="mb-0 fw-bold text-primary">
              {(item.price * item.quantity).toLocaleString()} Ft
            </p>
            <small className="text-muted">
              {item.price.toLocaleString()} Ft / db
            </small>
          </div>
          <div className="col-md-1 text-end">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removeFromCart(item.id, item.type)}
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
