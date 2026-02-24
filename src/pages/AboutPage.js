
import React from 'react';

function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card" style={{ border: '1px solid #e8e8e8' }}>
            <div className="card-body p-5">
              <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.7rem', color: '#888', textAlign: 'center', marginBottom: '0.5rem' }}>
                Ismerd meg
              </p>
              <h1 className="card-title mb-4 text-center" style={{ fontWeight: 700 }}>
                Rólunk
              </h1>

              <p className="lead text-center mb-5" style={{ color: '#555' }}>
                Üdvözlünk az <strong>Alkotások Tára</strong>-ban — a modern online könyvesboltban.
              </p>

              <h4 className="mt-4 mb-3" style={{ fontWeight: 600 }}>
                Küldetésünk
              </h4>
              <p style={{ color: '#555', lineHeight: 1.8 }}>
                Az Alkotások Tára célja, hogy megkönnyítse az olvasók számára a könyvek elérését.
                Akár vásárolni, akár kölcsönözni szeretnél, nálunk minden megtalálható egy helyen.
                Hiszünk abban, hogy a könyvek mindenki számára elérhetőek legyenek.
              </p>

              <h4 className="mt-4 mb-3" style={{ fontWeight: 600 }}>
                Miért válassz minket?
              </h4>
              <ul className="list-unstyled">
                {[
                  { label: 'Széles választék', desc: 'Több kategóriában is találsz könyveket' },
                  { label: 'Gyors szállítás', desc: '24-48 órán belül kézhez kapod a rendelésed' },
                  { label: 'Kölcsönzés', desc: 'Ha csak olvasni szeretnél, kölcsönözd ki kedvező áron' },
                  { label: 'Biztonságos fizetés', desc: 'Többféle fizetési mód közül választhatsz' },
                  { label: 'Ügyfélszolgálat', desc: 'Mindig rendelkezésedre állunk' },
                ].map((item, i) => (
                  <li key={i} className="mb-2" style={{ color: '#555' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#1a1a1a', marginRight: '12px', verticalAlign: 'middle' }}></span>
                    <strong>{item.label}:</strong> {item.desc}
                  </li>
                ))}
              </ul>

              <h4 className="mt-4 mb-3" style={{ fontWeight: 600 }}>
                Kategóriáink
              </h4>
              <p style={{ color: '#555' }}>Kínálatunkban megtalálhatók:</p>
              <div className="row">
                <div className="col-md-6">
                  <ul style={{ color: '#555' }}>
                    <li>Fantasy</li>
                    <li>Sci-Fi</li>
                    <li>Krimi</li>
                    <li>Romantikus</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul style={{ color: '#555' }}>
                    <li>Történelmi</li>
                    <li>Thriller</li>
                    <li>Klasszikus</li>
                    <li>...és még sok más!</li>
                  </ul>
                </div>
              </div>

              <h4 className="mt-4 mb-3" style={{ fontWeight: 600 }}>
                Technológia
              </h4>
              <p style={{ color: '#555', lineHeight: 1.8 }}>
                Az Alkotások Tára egy modern React alkalmazás, amely Bootstrap 5-öt használ a
                dizájnhoz. Az alkalmazás teljes mértékben reszponzív és minden eszközön
                kiválóan működik.
              </p>

              <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e8e8e8', padding: '1.5rem', marginTop: '2rem' }}>
                <h5 style={{ fontWeight: 600, marginBottom: '0.8rem' }}>
                  Kérdésed van?
                </h5>
                <p className="mb-0" style={{ color: '#555' }}>
                  Keress minket bizalommal az{' '}
                  <strong>info@alkotasok-tara.hu</strong> email címen vagy hívj minket
                  a <strong>+36 1 234 5678</strong> telefonszámon!
                </p>
              </div>

              <div className="text-center mt-5">
                <h5 className="mb-3" style={{ fontWeight: 600 }}>Kövesd be a közösségi médiában is!</h5>
                <button className="btn btn-outline-primary btn-lg me-2">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="btn btn-outline-primary btn-lg me-2">
                  <i className="bi bi-twitter"></i>
                </button>
                <button className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-instagram"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
