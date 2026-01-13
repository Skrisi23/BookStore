
import React, { useState, useEffect } from 'react';
import { getBooks } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/books/BookCard';

function HomePage({ onNavigate }) {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const data = await getBooks(ac.signal);
        const list = Array.isArray(data) ? data : [];
        // Véletlenszerű 4 könyv kiválasztása
        const shuffled = [...list].sort(() => Math.random() - 0.5);
        setFeaturedBooks(shuffled.slice(0, 4));
      } catch (e) {
        // Ha hiba van, hagyjuk üresen a kiemelt listát
        setFeaturedBooks([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">
                Üdvözlünk a BookStore-ban!
              </h1>
              <p className="lead mb-4">
                Fedezd fel könyveink széles választékát. Vásárolj vagy kölcsönözz könyveket kényelmesen otthonról!
              </p>
              <button
                className="btn btn-light btn-lg me-3"
                onClick={() => onNavigate('books')}
              >
                <i className="bi bi-book me-2"></i>
                Böngészés
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => onNavigate('about')}
              >
                Tudj meg többet
              </button>
            </div>
            <div className="col-md-6 text-center">
              <i className="bi bi-book display-1"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <i className="bi bi-cart-check display-4 text-primary mb-3"></i>
                <h5 className="card-title">Egyszerű vásárlás</h5>
                <p className="card-text text-muted">
                  Rendelj online, és akár 24 órán belül kézhez kapod a könyvet!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <i className="bi bi-bookmark-heart display-4 text-success mb-3"></i>
                <h5 className="card-title">Kölcsönzési lehetőség</h5>
                <p className="card-text text-muted">
                  Nincs szükséged megvenni? Kölcsönözd ki kedvező áron!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <i className="bi bi-search display-4 text-info mb-3"></i>
                <h5 className="card-title">Könnyű keresés</h5>
                <p className="card-text text-muted">
                  Szűrj kategóriák szerint vagy keress címre, szerzőre!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured books section */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-star me-2"></i>
            Kiemelt könyvek
          </h2>
          <button
            className="btn btn-outline-primary"
            onClick={() => onNavigate('books')}
          >
            Összes megtekintése
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
        {loading || featuredBooks.length === 0 ? (
          <LoadingSpinner fullPage text="Kiemelt könyvek betöltése..." />
        ) : (
          <div className="row">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-3">Készen állsz a felfedezésre?</h3>
          <p className="text-muted mb-4">
            Csatlakozz hozzánk és fedezd fel a könyvek világát!
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('books')}
          >
            <i className="bi bi-book me-2"></i>
            Kezdj el böngészni
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
