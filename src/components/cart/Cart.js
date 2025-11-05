// src/components/cart/Cart.js
import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';

function Cart({ onCheckout }) {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <h3 className="mt-3">A kosár üres</h3>
        <p className="text-muted">Adj hozzá könyveket a böngészés során!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>
          Kosár tartalma
          <span className="badge bg-secondary ms-2">{cartItems.length}</span>
        </h4>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
          <i className="bi bi-trash me-1"></i>
          Kosár ürítése
        </button>
      </div>

      {cartItems.map(item => (
        <CartItem key={`${item.id}-${item.type}`} item={item} />
      ))}

      <div className="card bg-light">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5>Összesen:</h5>
            </div>
            <div className="col-md-4 text-end">
              <h4 className="text-primary">
                {getTotalPrice().toLocaleString()} Ft
              </h4>
            </div>
          </div>
          <button
            className="btn btn-primary btn-lg w-100 mt-3"
            onClick={onCheckout}
          >
            <i className="bi bi-credit-card me-2"></i>
            Pénztárhoz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
