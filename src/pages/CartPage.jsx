import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/cart/Cart';
import Checkout from '../components/cart/Checkout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function CartPage() {
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cartItems } = useCart();
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
    <div>
      {/* Dark header */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '3rem 0' }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', color: '#888', marginBottom: '0.5rem' }}>
            {showCheckout ? 'Pénztár' : 'Kosár'}
          </p>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '0.3rem' }}>
            {showCheckout ? (
              <><i className="bi bi-credit-card me-3" style={{ fontSize: '1.6rem' }}></i>Fizetés</>
            ) : (
              <><i className="bi bi-bag me-3" style={{ fontSize: '1.6rem' }}></i>Kosár</>
            )}
          </h1>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: 0 }}>
            {showCheckout
              ? 'Add meg a szállítási adataidat és véglegesítsd a rendelést'
              : `${cartItems.length} tétel a kosaradban`}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        {showCheckout ? (
          <Checkout
            onSuccess={handleCheckoutSuccess}
            onCancel={() => setShowCheckout(false)}
          />
        ) : (
          <Cart onCheckout={handleCheckout} />
        )}
      </div>
    </div>
  );
}

export default CartPage;
