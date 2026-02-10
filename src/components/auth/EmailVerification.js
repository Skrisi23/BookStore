import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../api';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

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
                  <p className="text-muted mb-4">{message}</p>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-primary"
                      onClick={handleGoToLogin}
                    >
                      Vissza a bejelentkezéshez
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/')}
                    >
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
