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
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setError('A jelszavak nem egyeznek!');
      return;
    }

    if (formData.password.length < 6) {
      setError('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
      setLoading(false);
      return;
    }

    // Itt normális esetben API hívás lenne
    setTimeout(() => {
      success('Regisztráció sikeres! Most bejelentkezhetsz.');
      setLoading(false);
      onSwitchToLogin();
    }, 500);
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
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                className="btn btn-link position-absolute"
                style={{ 
                  right: '5px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  padding: '0',
                  border: 'none',
                  background: 'none',
                  color: '#6c757d',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Jelszó megerősítése</label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                className="btn btn-link position-absolute"
                style={{ 
                  right: '5px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  padding: '0',
                  border: 'none',
                  background: 'none',
                  color: '#6c757d',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  zIndex: 10
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Jelszó elrejtése" : "Jelszó megjelenítése"}
              >
                <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Regisztráció...
              </>
            ) : (
              'Regisztráció'
            )}
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
