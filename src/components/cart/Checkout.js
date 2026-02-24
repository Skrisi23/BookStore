
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { checkout } from '../../api';

function Checkout({ onSuccess, onCancel }) {
  const { cartItems, getTotalPrice, refreshCart } = useCart();
  const { currentUser } = useAuth();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    zipCode: '',
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
        success('Sikeres fizetés! Köszönjük a vásárlást!');
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
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">
              <i className="bi bi-credit-card me-2"></i>
              Szállítási adatok
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Név</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Cím</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Utca, házszám"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Város</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Irányítószám</label>
                  <input
                    type="text"
                    className="form-control"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Fizetési mód</label>
                <select
                  className="form-select"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="card">Bankkártya</option>
                  <option value="cash">Utánvét</option>
                  <option value="transfer">Átutalás</option>
                </select>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCancel}
                  disabled={loading}
                >
                  Mégse
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Feldolgozás...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Rendelés leadása
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Rendelés összesítő</h5>
            <hr />
            <div className="mb-3">
              {cartItems.map(item => (
                <div key={item.id} className="mb-3 pb-2 border-bottom">
                  <div className="mb-1">
                    <small className="fw-semibold d-block" style={{ 
                      wordWrap: 'break-word', 
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}>
                      {item.book_cim}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Mennyiség: {item.quantity} db</small>
                    <small className="fw-bold text-nowrap">
                      {(item.price * item.quantity).toLocaleString()} Ft
                    </small>
                  </div>
                </div>
              ))}
            </div>
            <hr className="mt-0" />
            <div className="d-flex justify-content-between align-items-center">
              <strong>Összesen:</strong>
              <strong className="text-primary fs-5">{getTotalPrice().toLocaleString()} Ft</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
