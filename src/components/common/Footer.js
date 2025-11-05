
import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>
              <i className="bi bi-book me-2"></i>
              BookStore
            </h5>
            <p className="text-muted">
              A legjobb online könyvesbolt Magyarországon. Vásárolj vagy kölcsönözz könyveket egyszerűen!
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Gyors linkek</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-muted text-decoration-none">Kezdőlap</a></li>
              <li><a href="#books" className="text-muted text-decoration-none">Könyvek</a></li>
              <li><a href="#about" className="text-muted text-decoration-none">Rólunk</a></li>
              <li><a href="#contact" className="text-muted text-decoration-none">Kapcsolat</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Kapcsolat</h5>
            <ul className="list-unstyled text-muted">
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                1052 Budapest, Példa utca 1.
              </li>
              <li>
                <i className="bi bi-envelope me-2"></i>
                info@bookstore.hu
              </li>
              <li>
                <i className="bi bi-telephone me-2"></i>
                +36 1 234 5678
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <p className="mb-0">
            &copy; 2025 BookStore. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
