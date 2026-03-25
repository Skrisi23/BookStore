import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail, resendVerificationEmail } from '../../api';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);
  const [resendDone, setResendDone] = useState(false);
  const [resendError, setResendError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Hiányzó verifikációs token');
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setStatus('success');
          setMessage(result.message || 'Email sikeresen verifikálva!');
        } else {
          setStatus('error');
          setMessage(result.message || 'Verifikáció sikertelen');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Hiba történt a verifikáció során');
      }
    };

    verify();
  }, [searchParams]);

  const handleResend = async () => {
    if (!resendEmail.trim()) return;
    setResending(true);
    setResendError('');
    const result = await resendVerificationEmail(resendEmail.trim());
    setResending(false);
    if (result.success) setResendDone(true);
    else setResendError(result.message || 'Email küldés sikertelen');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4 text-center">
              {status === 'loading' && (
                <>
                  <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Betöltés...</span>
                  </div>
                  <h3 className="card-title">Email verifikáció folyamatban...</h3>
                  <p className="text-muted">Kérlek várj, amíg ellenőrizzük a tokened.</p>
                </>
              )}

              {status === 'success' && (
                <>
                  <div className="text-success mb-3" style={{ fontSize: '4rem' }}>
                    <i className="bi bi-check-circle-fill"></i>
                  </div>
                  <h3 className="card-title text-success">Sikeres verifikáció!</h3>
                  <p className="text-muted mb-4">{message}</p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={handleGoToLogin}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Tovább a bejelentkezéshez
                  </button>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="text-danger mb-3" style={{ fontSize: '4rem' }}>
                    <i className="bi bi-x-circle-fill"></i>
                  </div>
                  <h3 className="card-title text-danger">Verifikáció sikertelen</h3>
                  <p className="text-muted mb-3">{message}</p>

                  {!resendDone ? (
                    <div className="mb-4 text-start">
                      <p className="text-muted small mb-2"><i className="bi bi-envelope-arrow-up me-1"></i>Kérj új verifikációs emailt:</p>
                      <div className="input-group input-group-sm">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="email@example.com"
                          value={resendEmail}
                          onChange={e => setResendEmail(e.target.value)}
                        />
                        <button
                          className="btn btn-warning"
                          onClick={handleResend}
                          disabled={resending || !resendEmail.trim()}
                        >
                          {resending
                            ? <span className="spinner-border spinner-border-sm"></span>
                            : 'Küldés'
                          }
                        </button>
                      </div>
                      {resendError && <p className="text-danger small mt-1 mb-0">{resendError}</p>}
                    </div>
                  ) : (
                    <div className="alert alert-success small mb-4">
                      <i className="bi bi-check-circle me-1"></i>
                      Email elküldve! Ellenőrizd a postaládádat (spam mappát is).
                    </div>
                  )}

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={handleGoToLogin}>
                      Vissza a bejelentkezéshez
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                      Vissza a főoldalra
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
