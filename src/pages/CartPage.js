
import React, { useState } from 'react';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import { useAuth } from '../context/AuthContext';

function CartPage({ onNavigate }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Kérjük jelentkezz be a rendelés leadásához!');
      onNavigate('login');
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    onNavigate('home');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        <i className="bi bi-cart3 me-2"></i>
        Kosár
      </h2>
      
      {showCheckout ? (
        <Checkout
          onSuccess={handleCheckoutSuccess}
          onCancel={() => setShowCheckout(false)}
        />
      ) : (
        <Cart onCheckout={handleCheckout} />
      )}
    </div>
  );
}

export default CartPage;
