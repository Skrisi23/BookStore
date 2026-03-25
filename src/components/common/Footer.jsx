
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-5" style={{ backgroundColor: '#1a1a1a', padding: '3rem 0 2rem' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white">
              <i className="bi bi-book me-2"></i>
              Alkotások Tára
            </h5>
            <p className="text-light">
              A legjobb online könyvesbolt Magyarországon. Vásárolj vagy kölcsönözz könyveket egyszerűen!
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Gyors linkek</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Kezdőlap</Link></li>
              <li><Link to="/books" className="text-light text-decoration-none">Könyvek</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">Rólunk</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="text-white">Kapcsolat</h5>
            <ul className="list-unstyled text-light">
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                1052 Budapest, Példa utca 1.
              </li>
              <li>
                <i className="bi bi-envelope me-2"></i>
                info@alkotasok-tara.hu
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i>
                +36 1 234 5678
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-light gap-2">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            &copy; 2026 Alkotások Tára. Minden jog fenntartva.
          </p>
          <ul className="list-unstyled d-flex gap-3 mb-0" style={{ fontSize: '0.85rem' }}>
            <li>
              <Link to="/terms" className="text-decoration-none" style={{ color: '#aaa' }}>ÁSZF</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-decoration-none" style={{ color: '#aaa' }}>Adatvédelem</Link>
            </li>
            <li>
              <Link to="/cookies" className="text-decoration-none" style={{ color: '#aaa' }}>Sütik</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
