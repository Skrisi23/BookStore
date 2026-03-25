import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';

function Cart({ onCheckout }) {
  const { cartItems, getTotalPrice, clearCart, loading } = useCart();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" style={{ color: '#1a1a1a' }} role="status">
          <span className="visually-hidden">Betöltés...</span>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center" style={{ padding: '5rem 0' }}>
        <i className="bi bi-bag" style={{ fontSize: '3.5rem', color: '#ccc', display: 'block', marginBottom: '1.5rem' }}></i>
        <h3 style={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.5rem' }}>A kosár üres</h3>
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>Adj hozzá könyveket a böngészés során!</p>
        <a href="/books" style={{
          display: 'inline-block',
          padding: '0.6rem 2rem',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>Böngészés</a>
      </div>
    );
  }

  const rentalItems = cartItems.filter(i => i.order_type !== 'purchase');
  const purchaseItems = cartItems.filter(i => i.order_type === 'purchase');

  return (
    <div className="row g-4">
      {/* Left: items */}
      <div className="col-lg-8">
        <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              Tételek ({cartItems.length})
            </h6>
          </div>
          <button
            className="btn btn-sm"
            style={{ borderRadius: 0, border: '1px solid #ccc', color: '#888', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.3rem 0.8rem' }}
            onClick={clearCart}
          >
            <i className="bi bi-x-lg me-1" style={{ fontSize: '0.65rem' }}></i>
            Ürítés
          </button>
        </div>

        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Right: summary */}
      <div className="col-lg-4">
        <div style={{ border: '1px solid #e8e8e8', position: 'sticky', top: '100px' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              Összesítő
            </h6>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {cartItems.map((item, idx) => (
              <div key={item.id} style={{ paddingBottom: '0.8rem', marginBottom: '0.8rem', borderBottom: idx < cartItems.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 500, fontSize: '0.85rem', marginBottom: '0.2rem', wordWrap: 'break-word' }}>{item.book_cim}</p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      backgroundColor: item.order_type === 'purchase' ? '#e8e8e8' : '#1a1a1a',
                      color: item.order_type === 'purchase' ? '#333' : '#fff',
                      textTransform: 'uppercase'
                    }}>
                      {item.order_type === 'purchase' ? 'Vásárlás' : 'Kölcsönzés'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa', marginLeft: '0.5rem' }}>{item.quantity} db</span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {(item.price * item.quantity).toLocaleString()} Ft
                  </span>
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #e8e8e8', marginTop: '0.5rem', paddingTop: '1rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Összesen</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1a1a1a' }}>{getTotalPrice().toLocaleString()} Ft</span>
              </div>
            </div>

            <button
              className="btn w-100"
              style={{
                marginTop: '1.5rem',
                borderRadius: 0,
                backgroundColor: '#1a1a1a',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                padding: '0.8rem'
              }}
              onClick={onCheckout}
            >
              <i className="bi bi-arrow-right me-2"></i>
              Pénztárhoz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
