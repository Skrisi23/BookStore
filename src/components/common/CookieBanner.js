import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    if (stored === null) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(true));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(false));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '1rem 1.5rem',
        zIndex: 9999,
        borderTop: '3px solid #fff',
      }}
    >
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <p className="mb-0" style={{ fontSize: '0.9rem', maxWidth: '680px' }}>
            <i className="bi bi-shield-check me-2"></i>
            Ez a weboldal sütiket (cookie-kat) használ a megfelelő működés érdekében. A szükséges sütik
            mindig aktívak. Az opcionális sütik elfogadásával segíti a jobb felhasználói élményt.{' '}
            <Link to="/sutik" style={{ color: '#ddd', textDecoration: 'underline' }}>
              Részletek
            </Link>
            {' · '}
            <Link to="/adatvedelem" style={{ color: '#ddd', textDecoration: 'underline' }}>
              Adatvédelem
            </Link>
          </p>
          <div className="d-flex gap-2 flex-shrink-0">
            <button
              onClick={accept}
              className="btn btn-light btn-sm"
              style={{ whiteSpace: 'nowrap', minWidth: '130px' }}
            >
              Minden elfogadása
            </button>
            <button
              onClick={decline}
              className="btn btn-outline-light btn-sm"
              style={{ whiteSpace: 'nowrap', minWidth: '130px' }}
            >
              Csak szükséges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
