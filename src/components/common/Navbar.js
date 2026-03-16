import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const{ currentUser, logout, isAdmin } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`navbar navbar-expand-lg${scrolled ? ' navbar-scrolled' : ''}`}
      style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e8e8',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.5px' }}>
          <i className="bi bi-book me-2"></i>
          Alkotások Tára
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ borderColor: '#ccc' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/"
                style={({ isActive }) => ({ color: isActive ? '#1a1a1a' : '#888', fontWeight: isActive ? 600 : 400, fontSize: '0.9rem', letterSpacing: '0.3px' })}
              >
                Kezdőlap
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/books"
                style={({ isActive }) => ({ color: isActive ? '#1a1a1a' : '#888', fontWeight: isActive ? 600 : 400, fontSize: '0.9rem', letterSpacing: '0.3px' })}
              >
                Könyvek
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to="/about"
                style={({ isActive }) => ({ color: isActive ? '#1a1a1a' : '#888', fontWeight: isActive ? 600 : 400, fontSize: '0.9rem', letterSpacing: '0.3px' })}
              >
                Rólunk
              </NavLink>
            </li>
            {isAdmin() && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/admin"
                  style={({ isActive }) => ({ color: isActive ? '#1a1a1a' : '#888', fontWeight: isActive ? 600 : 400, fontSize: '0.9rem', letterSpacing: '0.3px' })}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link position-relative d-inline-flex align-items-center"
                to="/cart"
                style={{ paddingRight: '0.75rem', color: '#1a1a1a' }}
              >
                <i className="bi bi-cart3 fs-5"></i>
                {getItemCount() > 0 && (
                  <span className="position-absolute badge" style={{ top: '-5px', right: '-5px', fontSize: '0.65rem', backgroundColor: '#1a1a1a', borderRadius: 0 }}>
                    {getItemCount()}
                  </span>
                )}
              </Link>
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
                  style={{ cursor: 'pointer', color: '#1a1a1a', fontSize: '0.9rem' }}
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser.nev || currentUser.name || 'Felhasználó'}
                </a>
                <ul 
                  className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                  style={{ 
                    right: '0',
                    left: 'auto',
                    minWidth: '180px',
                    borderRadius: 0,
                    border: '1px solid #e8e8e8',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                >
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/profile" 
                      onClick={() => setDropdownOpen(false)}
                    >
                      <i className="bi bi-person me-2"></i>
                      Profilom
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a 
                      className="dropdown-item text-danger" 
                      href="#logout" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
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
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  to="/login"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Bejelentkezés
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;