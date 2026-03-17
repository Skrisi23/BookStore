import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { checkout } from '../../api';

const labelStyle = {
  fontSize: '0.78rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#888',
  marginBottom: '0.4rem',
  display: 'block'
};

const inputStyle = {
  borderRadius: 0,
  borderColor: '#ccc'
};

function Checkout({ onSuccess, onCancel }) {
  const { cartItems, getTotalPrice, refreshCart } = useCart();
  const { currentUser } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  // Parse user's saved address (format: "1234 Budapest, Fő utca 1.")
  const parseAddress = (addr) => {
    if (!addr) return { zipCode: '', city: '', address: '' };
    const match = addr.match(/^(\d{4})\s+([^,]+),?\s*(.*)/);
    if (match) {
      return { zipCode: match[1], city: match[2].trim(), address: match[3].trim() };
    }
    return { zipCode: '', city: '', address: addr };
  };

  const parsed = parseAddress(currentUser?.default_address);
  const fullName = currentUser?.nev || [currentUser?.last_name, currentUser?.first_name].filter(Boolean).join(' ') || '';

  const [formData, setFormData] = useState({
    name: fullName,
    email: currentUser?.email || '',
    address: parsed.address,
    city: parsed.city,
    zipCode: parsed.zipCode,
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      error('Bejelentkezés szükséges');
      return;
    }

    try {
      setLoading(true);
      const result = await checkout(currentUser.id, formData.paymentMethod);
      if (result.success) {
        await refreshCart();
        success(result.message || 'Sikeres fizetés! Köszönjük a vásárlást!');
        onSuccess();
      } else {
        error(result.message || 'Hiba történt a fizetés során');
      }
    } catch (err) {
      console.error('Checkout hiba:', err);
      error('Hiba történt a fizetés során');
    } finally {
      setLoading(false);
    }
  };

  const rentalItems = cartItems.filter(i => i.order_type !== 'purchase');
  const purchaseItems = cartItems.filter(i => i.order_type === 'purchase');

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div style={{ border: '1px solid #e8e8e8' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              <i className="bi bi-truck me-2"></i>
              Szállítási adatok
            </h6>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Név</label>
                  <input type="text" className="form-control" style={inputStyle} name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={labelStyle}>Email</label>
                  <input type="email" className="form-control" style={inputStyle} name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label style={labelStyle}>Cím</label>
                <input type="text" className="form-control" style={inputStyle} name="address" value={formData.address} onChange={handleChange} placeholder="Utca, házszám" required />
              </div>

              <div className="row">
                <div className="col-md-8 mb-3">
                  <label style={labelStyle}>Város</label>
                  <input type="text" className="form-control" style={inputStyle} name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label style={labelStyle}>Irányítószám</label>
                  <input type="text" className="form-control" style={inputStyle} name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-4">
                <label style={labelStyle}>Fizetési mód</label>
                <select className="form-select" style={inputStyle} name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="card">Bankkártya</option>
                  <option value="cash">Utánvét</option>
                  <option value="transfer">Átutalás</option>
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn"
                  style={{ borderRadius: 0, border: '1px solid #ccc', color: '#555', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.2rem' }}
                  onClick={onCancel}
                  disabled={loading}
                >
                  Vissza
                </button>
                <button
                  type="submit"
                  className="btn"
                  style={{ borderRadius: 0, backgroundColor: '#1a1a1a', color: '#fff', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '0.5rem 1.5rem' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Feldolgozás...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2 me-2"></i>
                      Rendelés leadása
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Order summary sidebar */}
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

            {rentalItems.length > 0 && purchaseItems.length > 0 && (
              <div style={{ marginBottom: '0.8rem' }}>
                <div className="d-flex justify-content-between" style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Kölcsönzés</span>
                  <span style={{ fontSize: '0.8rem' }}>{rentalItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()} Ft</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Vásárlás</span>
                  <span style={{ fontSize: '0.8rem' }}>{purchaseItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()} Ft</span>
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Összesen</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1a1a1a' }}>{getTotalPrice().toLocaleString()} Ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
