// src/components/auth/Register.js
import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

function Register({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const { success } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('A jelszavak nem egyeznek!');
      return;
    }

    if (formData.password.length < 6) {
      setError('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
      return;
    }

    // Itt normális esetben API hívás lenne
    success('Regisztráció sikeres! Most bejelentkezhetsz.');
    onSwitchToLogin();
  };

  return (
    <div className="card shadow">
      <div className="card-body p-4">
        <h3 className="card-title text-center mb-4">
          <i className="bi bi-person-plus me-2"></i>
          Regisztráció
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Teljes név</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email cím</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jelszó</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jelszó megerősítése</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Regisztráció
          </button>

          <div className="text-center">
            <small className="text-muted">
              Van már fiókod?{' '}
              <a href="#login" onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}>
                Bejelentkezés
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
