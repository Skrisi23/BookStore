
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BookCard from '../components/books/BookCard';

function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const data = await getBooks(ac.signal);
        const list = Array.isArray(data) ? data : [];
        const sorted = [...list].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        const shuffled = [...sorted].sort(() => Math.random() - 0.5);
        setFeaturedBooks(shuffled.slice(0, 4));
      } catch (e) {
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
      {/* Hero section — full viewport height minus navbar */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        minHeight: 'calc(100vh - 73px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.03, fontSize: '22rem', lineHeight: 1 }}>
          <i className="bi bi-book"></i>
        </div>
        <div style={{ position: 'absolute', bottom: '8%', left: '3%', opacity: 0.03, fontSize: '12rem', lineHeight: 1 }}>
          <i className="bi bi-journal-text"></i>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <p style={{
                textTransform: 'uppercase',
                letterSpacing: '6px',
                fontSize: '0.7rem',
                color: '#666',
                marginBottom: '2rem'
              }}>
                Könyvesbolt & Kölcsönző
              </p>
              <h1 style={{
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: '2rem',
                letterSpacing: '-1px'
              }}>
                Alkotások<br/>
                <span style={{ color: '#555' }}>Tára</span>
              </h1>
              <p style={{
                fontSize: '1.15rem',
                color: '#999',
                maxWidth: '500px',
                lineHeight: 1.8,
                marginBottom: '3rem'
              }}>
                Fedezd fel könyveink széles választékát. Vásárolj vagy kölcsönözz könyveket kényelmesen otthonról.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-light btn-lg px-4"
                  style={{ fontWeight: 600, borderRadius: 0, letterSpacing: '0.5px' }}
                  onClick={() => navigate('/books')}
                >
                  Böngészés
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button
                  className="btn btn-outline-light btn-lg px-4"
                  style={{ borderRadius: 0, letterSpacing: '0.5px' }}
                  onClick={() => navigate('/about')}
                >
                  Rólunk
                </button>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '280px',
                  height: '280px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <i className="bi bi-book" style={{ fontSize: '6rem', opacity: 0.2 }}></i>
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    right: '-15px',
                    width: '280px',
                    height: '280px',
                    border: '1px solid #444'
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div className="text-center" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}>
            <div style={{ animation: 'bounce 2s infinite', opacity: 0.4 }}>
              <i className="bi bi-chevron-down" style={{ fontSize: '1.5rem' }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div style={{ backgroundColor: '#fff', padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
              Miért válassz minket?
            </p>
            <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px' }}>
              Minden, amire szükséged van
            </h2>
          </div>
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="h-100 p-5" style={{ border: '1px solid #e8e8e8', transition: 'all 0.3s' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.4rem'
                }}>
                  <i className="bi bi-cart-check"></i>
                </div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.8rem' }}>Egyszerű vásárlás</h5>
                <p style={{ color: '#888', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 0 }}>
                  Rendelj online, és akár 24 órán belül kézhez kapod a könyvet!
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-5" style={{ border: '1px solid #e8e8e8', transition: 'all 0.3s' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#333',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.4rem'
                }}>
                  <i className="bi bi-bookmark-heart"></i>
                </div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.8rem' }}>Kölcsönzési lehetőség</h5>
                <p style={{ color: '#888', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 0 }}>
                  Nincs szükséged megvenni? Kölcsönözd ki kedvező áron!
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="h-100 p-5" style={{ border: '1px solid #e8e8e8', transition: 'all 0.3s' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#555',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.4rem'
                }}>
                  <i className="bi bi-search"></i>
                </div>
                <h5 style={{ fontWeight: 600, marginBottom: '0.8rem' }}>Könnyű keresés</h5>
                <p style={{ color: '#888', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 0 }}>
                  Szűrj kategóriák szerint vagy keress címre, szerzőre!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured books section */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '6rem 0', borderTop: '1px solid #e8e8e8' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.5rem' }}>
                Válogatás
              </p>
              <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: 0 }}>
                Kiemelt könyvek
              </h2>
            </div>
            <button
              className="btn btn-dark px-4"
              style={{ borderRadius: 0, letterSpacing: '0.5px' }}
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
      </div>

      {/* Guest: registration prompt / Logged in: personalized section */}
      {!currentUser ? (
        <div style={{ backgroundColor: '#fff', padding: '5rem 0', borderTop: '1px solid #e8e8e8' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
                  Még nincs fiókod?
                </p>
                <h3 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
                  Hozz létre egy ingyenes fiókot
                </h3>
                <p style={{ color: '#888', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2rem' }}>
                  Regisztrálj, hogy vásárolhass és kölcsönözhess könyveket, nyomon követhesd rendeléseidet, és még több funkciót érhess el.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <button
                    className="btn btn-dark btn-lg px-4"
                    style={{ fontWeight: 600, borderRadius: 0, letterSpacing: '0.5px' }}
                    onClick={() => navigate('/login?register=true')}
                  >
                    Regisztráció
                    <i className="bi bi-person-plus ms-2"></i>
                  </button>
                  <button
                    className="btn btn-outline-dark btn-lg px-4"
                    style={{ borderRadius: 0, letterSpacing: '0.5px' }}
                    onClick={() => navigate('/login')}
                  >
                    Bejelentkezés
                  </button>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-flex justify-content-center">
                <div style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="bi bi-person-plus" style={{ fontSize: '4rem', color: '#ccc' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', padding: '5rem 0', borderTop: '1px solid #e8e8e8' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
                  Üdv újra, {currentUser?.nev || 'Felhasználó'}!
                </p>
                <h3 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
                  Folytasd a felfedezést
                </h3>
                <p style={{ color: '#888', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2rem' }}>
                  Nézd meg a legújabb könyveket, vagy tekintsd át a korábbi rendeléseidet és kölcsönzéseidet.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <button
                    className="btn btn-dark btn-lg px-4"
                    style={{ fontWeight: 600, borderRadius: 0, letterSpacing: '0.5px' }}
                    onClick={() => navigate('/books')}
                  >
                    Könyvek böngészése
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                  <button
                    className="btn btn-outline-dark btn-lg px-4"
                    style={{ borderRadius: 0, letterSpacing: '0.5px' }}
                    onClick={() => navigate('/profile')}
                  >
                    Profilom
                    <i className="bi bi-person ms-2"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-flex justify-content-center">
                <div style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>
                    {currentUser?.nev?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || '?'}
                  </span>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#888' }}>
                    {currentUser?.nev || 'Felhasználó'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to action */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '7rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', opacity: 0.03, fontSize: '20rem' }}>
          <i className="bi bi-stars"></i>
        </div>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#666', marginBottom: '1.5rem' }}>
            Ne maradj le
          </p>
          <h3 style={{ fontWeight: 700, fontSize: '2.5rem', marginBottom: '1.2rem', letterSpacing: '-0.5px' }}>
            Készen állsz a felfedezésre?
          </h3>
          <p style={{ color: '#888', marginBottom: '2.5rem', maxWidth: '450px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Csatlakozz hozzánk és fedezd fel a könyvek világát. Több száz könyv vár rád!
          </p>
          <button
            className="btn btn-light btn-lg px-5"
            style={{ fontWeight: 600, borderRadius: 0, letterSpacing: '0.5px' }}
            onClick={() => navigate('/books')}
          >
            Kezdj el böngészni
            <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
