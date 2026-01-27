import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar({ currentPage, setCurrentPage }) {
  const { currentUser, logout, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Bezárja a dropdown-ot ha máshova kattintunk
  useEffect(() => {
    const handleClickOutside = () => {
      if (dropdownOpen) setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home" onClick={() => setCurrentPage('home')}>
          <i className="bi bi-book me-2"></i>
          BookStore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                href="#home"
                onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
              >
                Kezdőlap
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
                href="#books"
                onClick={(e) => { e.preventDefault(); setCurrentPage('books'); }}
              >
                Könyvek
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                href="#about"
                onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}
              >
                Rólunk
              </a>
            </li>
            {isAdmin() && (
              <li className="nav-item">
                <a
                  className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
                  href="#admin"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('admin'); }}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Admin
                </a>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a
                className="nav-link position-relative d-inline-flex align-items-center"
                href="#cart"
                onClick={(e) => { e.preventDefault(); setCurrentPage('cart'); }}
                style={{ paddingRight: '0.75rem' }}
              >
                <i className="bi bi-cart3 fs-5"></i>
                {getItemCount() > 0 && (
                  <span className="position-absolute badge rounded-pill bg-danger" style={{ top: '-5px', right: '-5px', fontSize: '0.7rem' }}>
                    {getItemCount()}
                  </span>
                )}
              </a>
            </li>
            {currentUser ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#user"
                  id="userDropdown"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser.nev || currentUser.name || 'Felhasználó'}
                </a>
                <ul 
                  className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                  style={{ 
                    right: '0',
                    left: 'auto',
                    minWidth: '180px'
                  }}
                >
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#profile" 
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        setCurrentPage('profile');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="bi bi-person me-2"></i>
                      Profilom
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a 
                      className="dropdown-item text-danger" 
                      href="#logout" 
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        logout();
                        setCurrentPage('home');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Kijelentkezés
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#login"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('login'); }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Bejelentkezés
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;