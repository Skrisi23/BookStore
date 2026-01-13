
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function Checkout({ onSuccess, onCancel }) {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { success } = useToast();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Szimuláljuk a rendelés leadását
    const order = {
      id: Date.now(),
      userId: currentUser.id,
      items: cartItems,
      total: getTotalPrice(),
      shippingInfo: formData,
      orderDate: new Date().toISOString(),
      status: 'processing'
    };

    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    success('Sikeres rendelés! Köszönjük a vásárlást!');
    onSuccess();
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
                >
                  Mégse
                </button>
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check-circle me-2"></i>
                  Rendelés leadása
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Rendelés összesítő</h5>
            <hr />
            {cartItems.map(item => (
              <div key={`${item.id}-${item.type}`} className="d-flex justify-content-between mb-2">
                <small>{item.title} x{item.quantity}</small>
                <small className="fw-bold">{(item.price * item.quantity).toLocaleString()} Ft</small>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Összesen:</strong>
              <strong className="text-primary">{getTotalPrice().toLocaleString()} Ft</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
