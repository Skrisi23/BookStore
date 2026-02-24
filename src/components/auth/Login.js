
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
    <div className="card" style={{ border: '1px solid #e8e8e8' }}>
      <div className="card-body p-4">
        <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.65rem', color: '#888', textAlign: 'center', marginBottom: '0.3rem' }}>Fiók</p>
        <h3 className="card-title text-center mb-4" style={{ fontWeight: 700 }}>
          Bejelentkezés
        </h3>

        {error && (
          <div className={`alert ${error.includes('email') || error.includes('verifikál') ? 'alert-warning' : 'alert-danger'}`} role="alert">
            <i className={`bi ${error.includes('email') || error.includes('verifikál') ? 'bi-envelope-exclamation' : 'bi-exclamation-triangle'} me-2`}></i>
            {error}
            {(error.includes('email') || error.includes('verifikál')) && (
              <div className="mt-2">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Nem kaptad meg az emailt? Ellenőrizd a spam mappát!
                </small>
              </div>
            )}
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
          <div className="mb-2">
            <strong>Tipp:</strong> Használj email címet a bejelentkezéshez
          </div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
            <i className="bi bi-shield-check me-1"></i>
            Új regisztrációnál először erősítsd meg az email címedet!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
