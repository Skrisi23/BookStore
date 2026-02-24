
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
  const navigate = useNavigate();

  const features = [
    { icon: 'bi-book', label: 'Széles választék', desc: 'Több kategóriában is találsz könyveket — fantasytől a krimiig.' },
    { icon: 'bi-truck', label: 'Gyors szállítás', desc: '24–48 órán belül kézhez kapod a rendelésed.' },
    { icon: 'bi-bookmark-heart', label: 'Kölcsönzés', desc: 'Ha csak olvasni szeretnél, kölcsönözd ki kedvező áron.' },
    { icon: 'bi-shield-check', label: 'Biztonságos fizetés', desc: 'Többféle fizetési mód közül választhatsz.' },
    { icon: 'bi-headset', label: 'Ügyfélszolgálat', desc: 'Mindig rendelkezésedre állunk kérdéseiddel.' },
    { icon: 'bi-phone', label: 'Reszponzív dizájn', desc: 'Az alkalmazás minden eszközön kiválóan működik.' },
  ];

  const categories = ['Fantasy', 'Sci-Fi', 'Krimi', 'Romantikus', 'Történelmi', 'Thriller', 'Klasszikus', 'Disztópia'];

  return (
    <div>
      {/* Hero */}
      <div style={{
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.03, fontSize: '18rem', lineHeight: 1 }}>
          <i className="bi bi-info-circle"></i>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <p style={{ textTransform: 'uppercase', letterSpacing: '6px', fontSize: '0.65rem', color: '#666', marginBottom: '1.5rem' }}>
                Ismerd meg
              </p>
              <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                Rólunk
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#999', maxWidth: '480px', lineHeight: 1.8 }}>
                Üdvözlünk az <span style={{ color: '#fff', fontWeight: 600 }}>Alkotások Tára</span>-ban — a modern online könyvesboltban és kölcsönzőben.
              </p>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div style={{
                width: '220px',
                height: '220px',
                border: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <i className="bi bi-people" style={{ fontSize: '5rem', opacity: 0.15 }}></i>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '220px',
                  height: '220px',
                  border: '1px solid #444'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
                Küldetésünk
              </p>
              <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: '1.5rem' }}>
                Könyvek mindenkinek
              </h2>
              <p style={{ color: '#888', lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                Az Alkotások Tára célja, hogy megkönnyítse az olvasók számára a könyvek elérését. 
                Akár vásárolni, akár kölcsönözni szeretnél, nálunk minden megtalálható egy helyen. 
                Hiszünk abban, hogy a könyvek mindenki számára elérhetőek legyenek.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '5rem 0', borderTop: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
              Előnyök
            </p>
            <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px' }}>
              Miért válassz minket?
            </h2>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-4">
                <div className="h-100 p-4" style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: i < 2 ? '#1a1a1a' : i < 4 ? '#333' : '#555',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.2rem',
                    fontSize: '1.2rem'
                  }}>
                    <i className={`bi ${f.icon}`}></i>
                  </div>
                  <h6 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{f.label}</h6>
                  <p style={{ color: '#888', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ backgroundColor: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', marginBottom: '0.8rem' }}>
                Kínálatunk
              </p>
              <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: '1rem' }}>
                Kategóriáink
              </h2>
              <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '2rem' }}>
                Széleskörű kínálatunkban biztosan megtalálod a neked való könyvet.
              </p>
              <button
                className="btn btn-dark px-4"
                style={{ borderRadius: 0, letterSpacing: '0.5px' }}
                onClick={() => navigate('/books')}
              >
                Böngészés
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
            <div className="col-lg-7">
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.5rem 1.2rem',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      border: '1px solid #e8e8e8',
                      color: '#555',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => navigate('/books')}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#666', marginBottom: '0.8rem' }}>
                Elérhetőség
              </p>
              <h2 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', marginBottom: '1.5rem' }}>
                Kérdésed van?
              </h2>
              <p style={{ color: '#888', lineHeight: 1.7, maxWidth: '400px' }}>
                Keress minket bizalommal! Csapatunk szívesen segít bármilyen kérdésben.
              </p>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  <i className="bi bi-envelope" style={{ color: '#fff' }}></i>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.1rem' }}>Email</p>
                  <p style={{ color: '#fff', marginBottom: 0, fontWeight: 500 }}>info@alkotasok-tara.hu</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  <i className="bi bi-telephone" style={{ color: '#fff' }}></i>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.1rem' }}>Telefon</p>
                  <p style={{ color: '#fff', marginBottom: 0, fontWeight: 500 }}>+36 1 234 5678</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  flexShrink: 0
                }}>
                  <i className="bi bi-geo-alt" style={{ color: '#fff' }}></i>
                </div>
                <div>
                  <p style={{ color: '#666', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.1rem' }}>Cím</p>
                  <p style={{ color: '#fff', marginBottom: 0, fontWeight: 500 }}>1052 Budapest, Példa utca 1.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div style={{ borderTop: '1px solid #333', marginTop: '3rem', paddingTop: '2rem' }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 0 }}>Kövess minket a közösségi médiában</p>
              <div className="d-flex gap-2">
                {['bi-facebook', 'bi-twitter-x', 'bi-instagram'].map((icon, i) => (
                  <button
                    key={i}
                    className="btn"
                    style={{
                      width: '42px',
                      height: '42px',
                      border: '1px solid #444',
                      borderRadius: 0,
                      color: '#888',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      transition: 'all 0.2s'
                    }}
                  >
                    <i className={`bi ${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
