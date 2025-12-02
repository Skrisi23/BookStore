
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Login({ onSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(username, password);
      if (result && result.success) {
        alert(`Üdv, ${result.user?.name || username}!`);
        onSuccess();
      } else {
        setError((result && result.message) || 'Bejelentkezés sikertelen');
      }
    } catch (err) {
      setError('Bejelentkezés közben hiba történt');
    }
  };

  return (
    <div className="card shadow">
      <div className="card-body p-4">
        <h3 className="card-title text-center mb-4">
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Bejelentkezés
        </h3>

        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jelszó</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Bejelentkezés
          </button>

          <div className="text-center">
            <small className="text-muted">
              Nincs még fiókod?{' '}
              <a href="#register" onClick={(e) => {
                e.preventDefault();
                onSwitchToRegister();
              }}>
                Regisztráció
              </a>
            </small>
          </div>
        </form>

        <hr />

        <div className="alert alert-info small mb-0">
          <strong>Teszt bejelentkezések:</strong><br />
          Admin: <code>admin / admin123</code><br />
          User: <code>user / user123</code>
        </div>
      </div>
    </div>
  );
}

export default Login;
