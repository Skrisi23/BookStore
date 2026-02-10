
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function CartPage() {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated } = useAuth();
  const { warning } = useToast();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      warning('Kérjük jelentkezz be a rendelés leadásához!');
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    navigate('/');
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
