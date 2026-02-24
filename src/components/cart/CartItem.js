import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart, addToCart } = useCart();

  const isPurchase = item.order_type === 'purchase';
  const badgeLabel = isPurchase ? 'VÁSÁRLÁS' : 'KÖLCSÖNZÉS';

  const handleIncrement = async () => {
    if (!isPurchase) return;
    await addToCart(item.book_id, 'purchase', 1);
  };

  return (
    <div style={{ border: '1px solid #e8e8e8', marginBottom: '1rem', padding: '1.2rem 1.5rem' }}>
      <div className="row align-items-center">
        <div className="col-md-2 col-3">
          <img
            src={item.book_boritokep || '/placeholder.jpg'}
            alt={item.book_cim}
            style={{ width: '100%', height: '100px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-4 col-9">
          <h6 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.book_cim}</h6>
          <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
            {item.author_nev}
          </p>
          <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.6rem',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            backgroundColor: isPurchase ? '#e8e8e8' : '#1a1a1a',
            color: isPurchase ? '#333' : '#fff'
          }}>{badgeLabel}</span>
        </div>
        <div className="col-md-2 col-4 text-center" style={{ marginTop: '0.5rem' }}>
          {isPurchase ? (
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{item.quantity} db</span>
              <button
                onClick={handleIncrement}
                title="Mennyiség növelése"
                style={{
                  width: '26px',
                  height: '26px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: '#555'
                }}
              >
                <i className="bi bi-plus"></i>
              </button>
            </div>
          ) : (
            <span style={{ color: '#888', fontSize: '0.85rem' }}>{item.quantity} db</span>
          )}
        </div>
        <div className="col-md-2 col-4 text-end" style={{ marginTop: '0.5rem' }}>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1a1a1a', marginBottom: '0.1rem' }}>
            {(item.price * item.quantity).toLocaleString()} Ft
          </p>
          {item.quantity > 1 && (
            <span style={{ color: '#aaa', fontSize: '0.75rem' }}>{item.price.toLocaleString()} Ft/db</span>
          )}
        </div>
        <div className="col-md-2 col-4 text-end" style={{ marginTop: '0.5rem' }}>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              width: '32px',
              height: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e8e8e8',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: '#888',
              transition: 'all 0.2s'
            }}
            title="Eltávolítás"
          >
            <i className="bi bi-x-lg" style={{ fontSize: '0.75rem' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
