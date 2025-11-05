import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#home">📚 BookStore</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
                href="#books"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('books');
                }}
              >
                Könyvek
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'authors' ? 'active' : ''}`}
                href="#authors"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('authors');
                }}
              >
                Szerzők
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage('about');
                }}
              >
                Rólunk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
