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
  const [rentalDays, setRentalDays] = useState(14);
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
      const result = await checkout(currentUser.id, formData.paymentMethod, rentalDays);
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

  // Kölcsönzési ár kiszámítása az időtartam alapján
  const getRentalPrice = (basePrice, days) => {
    const baseRate = 0.05; // 14 nap = 5%
    const extraWeeks = Math.max(0, Math.floor((days - 14) / 7));
    const extraRate = extraWeeks * 0.03; // +3% per extra hét
    return Math.round(basePrice * (baseRate + extraRate));
  };

  // Kölcsönzési tételek összege az aktuális időtartammal
  const rentalTotal = rentalItems.reduce((sum, item) => {
    // A book ár a purchase áron van tárolva a copy.book.ar-ból
    // A rental item.price = book.ar * 0.05 (14 napos alap)
    // Tehát a book ár = item.price / 0.05
    const estimatedBookPrice = item.price / 0.05;
    return sum + getRentalPrice(estimatedBookPrice, rentalDays) * item.quantity;
  }, 0);

  const purchaseTotal = purchaseItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const calculatedTotal = rentalTotal + purchaseTotal;

  // Elérhető kölcsönzési időtartamok
  const rentalOptions = [
    { days: 14, label: '14 nap (alap)' },
    { days: 21, label: '21 nap (+3%)' },
    { days: 28, label: '28 nap (+6%)' },
    { days: 35, label: '35 nap (+9%)' },
    { days: 42, label: '42 nap (+12%)' },
    { days: 56, label: '56 nap (+18%)' },
    { days: 90, label: '90 nap (+33%)' },
  ];

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

              {rentalItems.length > 0 && (
                <div className="mb-4" style={{ border: '1px solid #e8e8e8', padding: '1.2rem' }}>
                  <label style={{ ...labelStyle, marginBottom: '0.8rem' }}>
                    <i className="bi bi-clock me-1"></i>
                    Kölcsönzési időtartam
                  </label>
                  <div className="row g-2">
                    {rentalOptions.map(opt => (
                      <div className="col-6 col-md-4" key={opt.days}>
                        <button
                          type="button"
                          onClick={() => setRentalDays(opt.days)}
                          style={{
                            width: '100%',
                            padding: '0.6rem 0.5rem',
                            border: rentalDays === opt.days ? '2px solid #1a1a1a' : '1px solid #ccc',
                            backgroundColor: rentalDays === opt.days ? '#1a1a1a' : 'transparent',
                            color: rentalDays === opt.days ? '#fff' : '#333',
                            fontSize: '0.78rem',
                            fontWeight: rentalDays === opt.days ? 600 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            borderRadius: 0,
                          }}
                        >
                          {opt.label}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: '#888' }}>
                    <i className="bi bi-info-circle me-1"></i>
                    Minimum kölcsönzési idő: 14 nap. Hosszabb időtartam esetén a kölcsönzési díj emelkedik.
                    {rentalDays > 14 && (
                      <span style={{ display: 'block', marginTop: '0.3rem', color: '#c9302c' }}>
                        A(z) {rentalDays} napos kölcsönzés extra díja: +{((Math.floor((rentalDays - 14) / 7)) * 3)}% a könyv árára vetítve
                      </span>
                    )}
                  </div>
                </div>
              )}

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
            {cartItems.map((item, idx) => {
              const isRental = item.order_type !== 'purchase';
              const displayPrice = isRental
                ? getRentalPrice(item.price / 0.05, rentalDays) * item.quantity
                : item.price * item.quantity;

              return (
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
                      {item.order_type === 'purchase' ? 'Vásárlás' : `Kölcsönzés (${rentalDays} nap)`}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#aaa', marginLeft: '0.5rem' }}>{item.quantity} db</span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {displayPrice.toLocaleString()} Ft
                  </span>
                </div>
              </div>
              );
            })}

            {rentalItems.length > 0 && purchaseItems.length > 0 && (
              <div style={{ marginBottom: '0.8rem' }}>
                <div className="d-flex justify-content-between" style={{ marginBottom: '0.3rem' }}>
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Kölcsönzés ({rentalDays} nap)</span>
                  <span style={{ fontSize: '0.8rem' }}>{rentalTotal.toLocaleString()} Ft</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#888', fontSize: '0.8rem' }}>Vásárlás</span>
                  <span style={{ fontSize: '0.8rem' }}>{purchaseTotal.toLocaleString()} Ft</span>
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Összesen</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1a1a1a' }}>{calculatedTotal.toLocaleString()} Ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
