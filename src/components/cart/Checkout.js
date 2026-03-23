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

const RENTAL_DAY_OPTIONS = [14, 21, 28, 35, 42, 56, 90];
const SURCHARGE_DAYS = 90;
const SURCHARGE_PERCENT = 30;

function Checkout({ onSuccess, onCancel }) {
  const { cartItems, refreshCart } = useCart();
  const { currentUser } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);

  const rentalItems = cartItems.filter(i => i.order_type !== 'purchase');
  const purchaseItems = cartItems.filter(i => i.order_type === 'purchase');

  const [rentalDaysPerItem, setRentalDaysPerItem] = useState(() => {
    const initial = {};
    rentalItems.forEach(item => {
      initial[item.id] = 14;
    });
    return initial;
  });

  const handleRentalDaysChange = (itemId, days) => {
    setRentalDaysPerItem(prev => ({
      ...prev,
      [itemId]: days
    }));
  };

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

  // Számított árak: arányos a kölcsönzési napokkal (14 nap = alapár)
  const BASE_RENTAL_DAYS = 14;

  const getItemPrice = (item) => {
    const base = item.price * item.quantity;
    if (item.order_type !== 'purchase') {
      const days = rentalDaysPerItem[item.id] || BASE_RENTAL_DAYS;
      let price = base * (days / BASE_RENTAL_DAYS);
      if (days >= SURCHARGE_DAYS) {
        price *= (1 + SURCHARGE_PERCENT / 100);
      }
      return Math.round(price);
    }
    return base;
  };

  const rentalTotal = rentalItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  const purchaseTotal = purchaseItems.reduce((sum, item) => sum + getItemPrice(item), 0);
  const grandTotal = rentalTotal + purchaseTotal;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.id) {
      error('Bejelentkezés szükséges');
      return;
    }

    try {
      setLoading(true);
      const daysMap = {};
      Object.entries(rentalDaysPerItem).forEach(([key, val]) => {
        daysMap[String(key)] = val;
      });
      const result = await checkout(currentUser.id, formData.paymentMethod, 14, daysMap);
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

  return (
    <div className="row g-4">
      {/* Left: Szállítási adatok */}
      <div className="col-lg-7">
        <div style={{ border: '1px solid #e8e8e8' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              <i className="bi bi-truck me-2"></i>
              Szállítási adatok
            </h6>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <form onSubmit={handleSubmit} id="checkout-form">
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

      {/* Right: Összesítő with rental duration selectors */}
      <div className="col-lg-5">
        <div style={{ border: '1px solid #e8e8e8', position: 'sticky', top: '100px' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e8e8e8' }}>
            <h6 style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.7rem', color: '#888', marginBottom: 0 }}>
              Összesítő
            </h6>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {cartItems.map((item, idx) => {
              const isRental = item.order_type !== 'purchase';
              const selectedDays = rentalDaysPerItem[item.id] || 14;
              const pctIncrease = isRental && selectedDays > BASE_RENTAL_DAYS
                ? Math.round(((selectedDays / BASE_RENTAL_DAYS) * (selectedDays >= SURCHARGE_DAYS ? (1 + SURCHARGE_PERCENT / 100) : 1) - 1) * 100)
                : 0;

              return (
                <div key={item.id} style={{
                  paddingBottom: '1rem',
                  marginBottom: '1rem',
                  borderBottom: idx < cartItems.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  {/* Title + price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 0, flex: 1, minWidth: 0, wordWrap: 'break-word' }}>
                      {item.book_cim}
                    </p>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                      {getItemPrice(item).toLocaleString()} Ft
                    </span>
                  </div>

                  {/* Badge + quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: isRental ? '0.6rem' : 0 }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.15rem 0.5rem',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      backgroundColor: isRental ? '#1a1a1a' : '#e8e8e8',
                      color: isRental ? '#fff' : '#333',
                      textTransform: 'uppercase'
                    }}>
                      {isRental ? 'Kölcsönzés' : 'Vásárlás'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{item.quantity} db</span>
                  </div>

                  {/* Rental duration chip buttons */}
                  {isRental && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.4rem' }}>
                        <i className="bi bi-clock" style={{ fontSize: '0.7rem', color: '#aaa' }}></i>
                        <span style={{ fontSize: '0.72rem', color: '#aaa' }}>Kölcsönzési időtartam:</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {RENTAL_DAY_OPTIONS.map(days => {
                          const isSelected = selectedDays === days;
                          return (
                            <button
                              key={days}
                              type="button"
                              onClick={() => handleRentalDaysChange(item.id, days)}
                              style={{
                                padding: '0.25rem 0.6rem',
                                fontSize: '0.72rem',
                                fontWeight: isSelected ? 600 : 400,
                                border: isSelected ? '1.5px solid #1a1a1a' : '1px solid #ccc',
                                backgroundColor: isSelected ? '#1a1a1a' : '#fff',
                                color: isSelected ? '#fff' : '#555',
                                cursor: 'pointer',
                                borderRadius: '2px',
                                transition: 'all 0.15s',
                                lineHeight: 1.3
                              }}
                            >
                              {days} nap
                            </button>
                          );
                        })}
                      </div>
                      {pctIncrease > 0 && (
                        <span style={{ fontSize: '0.7rem', color: '#d9534f', fontWeight: 500, marginTop: '0.3rem', display: 'inline-block' }}>
                          +{pctIncrease}% felár
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Subtotals */}
            {rentalItems.length > 0 && purchaseItems.length > 0 && (
              <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '0.8rem', marginBottom: '0.5rem' }}>
                <div className="d-flex justify-content-between" style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#555', fontSize: '0.82rem' }}>Kölcsönzés</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{rentalTotal.toLocaleString()} Ft</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#555', fontSize: '0.82rem' }}>Vásárlás</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{purchaseTotal.toLocaleString()} Ft</span>
                </div>
              </div>
            )}

            {/* Grand total */}
            <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Összesen</span>
                <span style={{ fontWeight: 700, fontSize: '1.4rem', color: '#2e7d32' }}>
                  {grandTotal.toLocaleString()} Ft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
