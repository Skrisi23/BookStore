
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/books/BookCard';

function HomePage() {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const data = await getBooks(ac.signal);
        const list = Array.isArray(data) ? data : [];
        // Rendezés ID alapján, majd véletlenszerű 4 könyv kiválasztása
        const sorted = [...list].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        const shuffled = [...sorted].sort(() => Math.random() - 0.5);
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
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '6rem 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.75rem', color: '#888', marginBottom: '1.5rem' }}>
                Könyvesbolt & Kölcsönző
              </p>
              <h1 style={{ fontSize: '3.2rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                Alkotások<br/>Tára
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#aaa', maxWidth: '480px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Fedezd fel könyveink széles választékát. Vásárolj vagy kölcsönözz könyveket kényelmesen otthonról.
              </p>
              <button
                className="btn btn-light btn-lg me-3"
                onClick={() => navigate('/books')}
              >
                Böngészés
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => navigate('/about')}
              >
                Rólunk
              </button>
            </div>
            <div className="col-lg-5 text-center d-none d-lg-block">
              <i className="bi bi-book" style={{ fontSize: '8rem', opacity: 0.15 }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="container" style={{ padding: '5rem 0' }}>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{ border: '1px solid #e8e8e8' }}>
              <div className="card-body p-5">
                <i className="bi bi-cart-check" style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1.2rem', display: 'block' }}></i>
                <h5 className="card-title" style={{ fontWeight: 600 }}>Egyszerű vásárlás</h5>
                <p className="card-text" style={{ color: '#888', fontSize: '0.92rem' }}>
                  Rendelj online, és akár 24 órán belül kézhez kapod a könyvet!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{ border: '1px solid #e8e8e8' }}>
              <div className="card-body p-5">
                <i className="bi bi-bookmark-heart" style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1.2rem', display: 'block' }}></i>
                <h5 className="card-title" style={{ fontWeight: 600 }}>Kölcsönzési lehetőség</h5>
                <p className="card-text" style={{ color: '#888', fontSize: '0.92rem' }}>
                  Nincs szükséged megvenni? Kölcsönözd ki kedvező áron!
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100" style={{ border: '1px solid #e8e8e8' }}>
              <div className="card-body p-5">
                <i className="bi bi-search" style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1.2rem', display: 'block' }}></i>
                <h5 className="card-title" style={{ fontWeight: 600 }}>Könnyű keresés</h5>
                <p className="card-text" style={{ color: '#888', fontSize: '0.92rem' }}>
                  Szűrj kategóriák szerint vagy keress címre, szerzőre!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured books section */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontWeight: 700, fontSize: '1.6rem' }}>
            Kiemelt könyvek
          </h2>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/books')}
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
      <div style={{ backgroundColor: '#f5f5f5', padding: '5rem 0', borderTop: '1px solid #e8e8e8' }}>
        <div className="container text-center">
          <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Készen állsz a felfedezésre?</h3>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
            Csatlakozz hozzánk és fedezd fel a könyvek világát!
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/books')}
          >
            Kezdj el böngészni
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
