
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

function Login({ onSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { success } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(username, password);
      if (result && result.success) {
        success(`Üdvözöllek, ${result.user?.nev || username}!`);
        onSuccess();
      } else {
        setError(result?.message || 'Sikertelen bejelentkezés');
      }
    } catch (err) {
      setError('Hiba történt a bejelentkezés során');
    } finally {
      setLoading(false);
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
            <label className="form-label">Email cím</label>
            <input
              type="email"
              className="form-control"
              placeholder="pelda@email.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Jelszó</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Bejelentkezés...
              </>
            ) : (
              'Bejelentkezés'
            )}
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
          <strong>Tipp:</strong> Használj email címet a bejelentkezéshez
        </div>
      </div>
    </div>
  );
}

export default Login;
