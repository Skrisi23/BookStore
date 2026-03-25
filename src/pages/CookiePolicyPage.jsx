import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CookiePolicyPage() {
  const [consent, setConsent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cookieConsent') || 'null');
    } catch {
      return null;
    }
  });

  const saveConsent = (value) => {
    localStorage.setItem('cookieConsent', JSON.stringify(value));
    setConsent(value);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '860px' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: '#1a1a1a' }}>Kezdőlap</Link>
          </li>
          <li className="breadcrumb-item active">Cookie tájékoztató</li>
        </ol>
      </nav>

      <h1 className="mb-1" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
        Cookie tájékoztató
      </h1>
      <p className="text-muted mb-5" style={{ fontSize: '0.9rem' }}>
        Hatályos: 2026. január 1-től &nbsp;·&nbsp; Alkotások Tára Kft.
      </p>

      {/* Jelenlegi beállítás */}
      <div className="p-4 mb-5" style={{ border: '2px solid #1a1a1a' }}>
        <h2 className="h5 mb-3">Jelenlegi cookie-beállítás</h2>
        {consent === null ? (
          <p className="mb-3 text-muted">Még nem adott hozzájárulást az opcionális sütik használatához.</p>
        ) : consent === true ? (
          <p className="mb-3" style={{ color: '#1a1a1a' }}>
            <i className="bi bi-check-circle me-2"></i>
            <strong>Minden sütit elfogadott.</strong>
          </p>
        ) : (
          <p className="mb-3" style={{ color: '#555' }}>
            <i className="bi bi-x-circle me-2"></i>
            <strong>Csak a szükséges sütiket fogadta el.</strong>
          </p>
        )}
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-primary btn-sm" onClick={() => saveConsent(true)}>
            Minden süti elfogadása
          </button>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => saveConsent(false)}>
            Csak szükséges sütik
          </button>
          {consent !== null && (
            <button
              className="btn btn-sm"
              style={{ border: '1px solid #ccc', color: '#555' }}
              onClick={() => { localStorage.removeItem('cookieConsent'); setConsent(null); }}
            >
              Hozzájárulás visszavonása
            </button>
          )}
        </div>
      </div>

      {/* Mi az a süti */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          1. Mi az a süti (cookie)?
        </h2>
        <p>
          A sütik kis méretű szövegfájlok, amelyeket a weboldal az Ön böngészőjébe ment. Lehetővé teszik,
          hogy a weboldal megjegyezzen bizonyos adatokat (pl. bejelentkezési állapot, kosár tartalma),
          így Ön kényelmesebben és hatékonyabban tudja használni az oldalt.
        </p>
        <p>
          A sütik jogszabályi háttere: az elektronikus hírközlésről szóló 2003. évi C. törvény 155/A. §,
          valamint az (EU) 2016/679 rendelet (GDPR).
        </p>
      </section>

      {/* Sütitípusok */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          2. Az általunk használt sütik
        </h2>

        {/* Szükséges */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="h6 mb-0" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              2.1 Feltétlenül szükséges sütik
            </h3>
            <span className="badge" style={{ background: '#1a1a1a', color: '#fff', borderRadius: 0 }}>
              Mindig aktív
            </span>
          </div>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>
            Ezek a sütik a weboldal alapvető működéséhez nélkülözhetetlenek. Hozzájárulás nélkül is tárolódnak,
            mivel jogos érdekre alapozzák adatkezelésüket.
          </p>
          <table className="table table-sm" style={{ fontSize: '0.88rem' }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr>
                <th>Süti neve</th>
                <th>Cél</th>
                <th>Lejárat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>cookieConsent</code></td>
                <td>A cookie-hozzájárulás tárolása (localStorage)</td>
                <td>Visszavonásig</td>
              </tr>
              <tr>
                <td>Munkamenet-token (auth)</td>
                <td>Bejelentkezett állapot fenntartása</td>
                <td>Munkamenet végéig</td>
              </tr>
              <tr>
                <td>Kosár (cart) adat</td>
                <td>Kosár tartalmának megőrzése</td>
                <td>Munkamenet végéig</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Funkcionális */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h3 className="h6 mb-0" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              2.2 Funkcionális sütik
            </h3>
            <span className="badge" style={{ background: consent === true ? '#1a1a1a' : '#aaa', color: '#fff', borderRadius: 0 }}>
              {consent === true ? 'Aktív' : 'Inaktív'}
            </span>
          </div>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>
            Ezek a sütik javítják a felhasználói élményt (pl. preferenciák megőrzése). Csak az Ön hozzájárulásával tárolódnak.
          </p>
          <table className="table table-sm" style={{ fontSize: '0.88rem' }}>
            <thead style={{ background: '#f0f0f0' }}>
              <tr>
                <th>Süti neve</th>
                <th>Cél</th>
                <th>Lejárat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Felhasználói beállítások</td>
                <td>Szűrési és megjelenítési beállítások megőrzése</td>
                <td>30 nap</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sütik kezelése a böngészőben */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          3. Sütik kezelése a böngészőben
        </h2>
        <p>
          A sütik böngészőszinten is letilthatók és törölhetők. Kérjük, vegye figyelembe, hogy a szükséges
          sütik letiltása esetén a weboldal egyes funkciói nem működnek megfelelően.
        </p>
        <div className="row g-2">
          {[
            { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
            { name: 'Mozilla Firefox', url: 'https://support.mozilla.org/hu/kb/sutik-engedelyezese-es-tiltasa' },
            { name: 'Microsoft Edge', url: 'https://support.microsoft.com/hu-hu/windows/süti-törlése-és-kezelése-az-edge-ben-00cf5596-7f35-fdda-2f1e-edc2d8f2d994' },
            { name: 'Safari', url: 'https://support.apple.com/hu-hu/guide/safari/sfri11471/mac' },
          ].map((b) => (
            <div className="col-md-6" key={b.name}>
              <div className="p-3" style={{ border: '1px solid #e8e8e8', fontSize: '0.9rem' }}>
                <i className="bi bi-browser-chrome me-2"></i>
                <a href={b.url} target="_blank" rel="noreferrer" style={{ color: '#1a1a1a' }}>
                  {b.name} súgó
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kapcsolat */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          4. Kapcsolat
        </h2>
        <p>
          Ha kérdése van a sütik használatával kapcsolatban, forduljon hozzánk az{' '}
          <a href="mailto:adatvedelem@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>
            adatvedelem@alkotasok-tara.hu
          </a>{' '}
          e-mail-címen.
        </p>
      </section>

      <div className="alert" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 0 }}>
        <small className="text-muted">
          <strong>Kapcsolódó dokumentumok:</strong>{' '}
          <Link to="/terms" style={{ color: '#1a1a1a' }}>ÁSZF</Link>
          {' · '}
          <Link to="/privacy" style={{ color: '#1a1a1a' }}>Adatvédelmi tájékoztató</Link>
        </small>
      </div>
    </div>
  );
}

export default CookiePolicyPage;
