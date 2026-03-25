import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPage() {
  return (
    <div className="container py-5" style={{ maxWidth: '860px' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: '#1a1a1a' }}>Kezdőlap</Link>
          </li>
          <li className="breadcrumb-item active">Adatvédelmi tájékoztató</li>
        </ol>
      </nav>

      <h1 className="mb-1" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
        Adatvédelmi tájékoztató
      </h1>
      <p className="text-muted mb-5" style={{ fontSize: '0.9rem' }}>
        Hatályos: 2026. január 1-től &nbsp;·&nbsp; GDPR-kompatibilis
      </p>

      {/* Bevezető */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          1. Bevezetés és az adatkezelő adatai
        </h2>
        <p>
          Az <strong>Alkotások Tára Kft.</strong> (továbbiakban: <strong>Adatkezelő</strong>) elkötelezett a Felhasználók
          személyes adatainak védelme iránt. Jelen tájékoztató az (EU) 2016/679 rendelet (GDPR) és a 2011. évi CXII.
          törvény (Info tv.) alapján tájékoztatja az érintetteket a személyes adatok kezeléséről.
        </p>
        <table className="table table-borderless" style={{ fontSize: '0.95rem' }}>
          <tbody>
            <tr><td style={{ width: '220px', color: '#555' }}>Adatkezelő neve:</td><td><strong>Alkotások Tára Kft.</strong></td></tr>
            <tr><td style={{ color: '#555' }}>Székhely:</td><td>1052 Budapest, Példa utca 1.</td></tr>
            <tr><td style={{ color: '#555' }}>Adatvédelmi kapcsolat:</td><td><a href="mailto:adatvedelem@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>adatvedelem@alkotasok-tara.hu</a></td></tr>
            <tr><td style={{ color: '#555' }}>Felügyeleti hatóság:</td><td>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), <a href="https://www.naih.hu" target="_blank" rel="noreferrer" style={{ color: '#1a1a1a' }}>www.naih.hu</a></td></tr>
          </tbody>
        </table>
      </section>

      {/* Adatkezelési tevékenységek */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          2. Kezelt személyes adatok és adatkezelési célok
        </h2>

        {/* Regisztráció */}
        <div className="mb-4 p-4" style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
          <h3 className="h6 mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            2.1 Regisztráció és fiókkezelés
          </h3>
          <table className="table table-sm mb-0" style={{ fontSize: '0.9rem' }}>
            <tbody>
              <tr><td style={{ width: '180px', color: '#555' }}>Kezelt adatok:</td><td>Teljes név, e-mail-cím, jelszó (hash formában), alapértelmezett szállítási cím, regisztráció időpontja</td></tr>
              <tr><td style={{ color: '#555' }}>Cél:</td><td>Felhasználói fiók létrehozása, azonosítás, kommunikáció</td></tr>
              <tr><td style={{ color: '#555' }}>Jogalap:</td><td>Szerződés teljesítése (GDPR 6. cikk (1) b)</td></tr>
              <tr><td style={{ color: '#555' }}>Megőrzési idő:</td><td>A fiók törléséig, de legalább a jogszabályi kötelezettség teljesítéséig (5 év)</td></tr>
            </tbody>
          </table>
        </div>

        {/* Vásárlás */}
        <div className="mb-4 p-4" style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
          <h3 className="h6 mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            2.2 Vásárlás és rendeléskezelés
          </h3>
          <table className="table table-sm mb-0" style={{ fontSize: '0.9rem' }}>
            <tbody>
              <tr><td style={{ width: '180px', color: '#555' }}>Kezelt adatok:</td><td>Megrendelési adatok, fizetési összeg, fizetési mód, megrendelés dátuma, szállítási cím</td></tr>
              <tr><td style={{ color: '#555' }}>Cél:</td><td>Megrendelés teljesítése, számviteli kötelezettségek teljesítése</td></tr>
              <tr><td style={{ color: '#555' }}>Jogalap:</td><td>Szerződés teljesítése (GDPR 6. cikk (1) b), jogi kötelezettség (GDPR 6. cikk (1) c)</td></tr>
              <tr><td style={{ color: '#555' }}>Megőrzési idő:</td><td>8 év (számviteli törvény alapján)</td></tr>
            </tbody>
          </table>
        </div>

        {/* Kölcsönzés */}
        <div className="mb-4 p-4" style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
          <h3 className="h6 mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            2.3 Könyvkölcsönzés
          </h3>
          <table className="table table-sm mb-0" style={{ fontSize: '0.9rem' }}>
            <tbody>
              <tr><td style={{ width: '180px', color: '#555' }}>Kezelt adatok:</td><td>Kölcsönzési adatok (könyv, példány, kölcsönzés/visszaküldés dátuma, esedékesség), fizetési adatok</td></tr>
              <tr><td style={{ color: '#555' }}>Cél:</td><td>Kölcsönzési szerződés teljesítése, emlékeztető e-mailek küldése</td></tr>
              <tr><td style={{ color: '#555' }}>Jogalap:</td><td>Szerződés teljesítése (GDPR 6. cikk (1) b)</td></tr>
              <tr><td style={{ color: '#555' }}>Megőrzési idő:</td><td>Kölcsönzés lezárásától számított 5 év</td></tr>
            </tbody>
          </table>
        </div>

        {/* E-mail értesítések */}
        <div className="mb-4 p-4" style={{ background: '#f9f9f9', border: '1px solid #e8e8e8' }}>
          <h3 className="h6 mb-3" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            2.4 Tranzakcionális e-mail értesítések
          </h3>
          <table className="table table-sm mb-0" style={{ fontSize: '0.9rem' }}>
            <tbody>
              <tr><td style={{ width: '180px', color: '#555' }}>Kezelt adatok:</td><td>E-mail-cím, megrendelési hivatkozási számok, kölcsönzési határidők</td></tr>
              <tr><td style={{ color: '#555' }}>Cél:</td><td>Visszaigazolás, kölcsönzési emlékeztető, fiókverifikáció, adminisztrátori értesítések küldése</td></tr>
              <tr><td style={{ color: '#555' }}>Jogalap:</td><td>Szerződés teljesítése (GDPR 6. cikk (1) b)</td></tr>
              <tr><td style={{ color: '#555' }}>Megőrzési idő:</td><td>Az érintett felhasználói fiókjának törléséig</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Adattovábbítás */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          3. Adattovábbítás és adatfeldolgozók
        </h2>
        <p>
          Az Adatkezelő a személyes adatokat harmadik félnek nem adja el. Az adatok feldolgozásához az alábbi
          adatfeldolgozókat veszi igénybe:
        </p>
        <table className="table" style={{ fontSize: '0.9rem' }}>
          <thead style={{ background: '#1a1a1a', color: '#fff' }}>
            <tr>
              <th>Adatfeldolgozó</th>
              <th>Tevékenység</th>
              <th>Székhely</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tárhelyszolgáltató (s58.tarhely.com)</td>
              <td>Szerver és adatbázis-tárhely</td>
              <td>Magyarország</td>
            </tr>
            <tr>
              <td>Mailtrap / MailKit</td>
              <td>Tranzakcionális e-mail küldés</td>
              <td>EU</td>
            </tr>
            <tr>
              <td>Fizetési szolgáltató</td>
              <td>Online bankkártyás fizetés feldolgozása</td>
              <td>EU</td>
            </tr>
          </tbody>
        </table>
        <p>
          Hatóság részére történő adattovábbítás kizárólag jogszabályi kötelezettség alapján, bírósági végzés vagy
          hatósági megkeresés esetén történik.
        </p>
      </section>

      {/* Az érintett jogai */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          4. Az érintett jogai (GDPR III. fejezet)
        </h2>
        <div className="row g-3">
          {[
            { title: 'Tájékoztatáshoz való jog', text: 'Joga van tájékoztatást kapni a kezelt adatairól és az adatkezelés körülményeiről.' },
            { title: 'Hozzáférési jog', text: 'Kérheti a kezelt személyes adatainak másolatát.' },
            { title: 'Helyesbítéshez való jog', text: 'Kérheti pontatlan adatainak helyesbítését vagy hiányos adatainak kiegészítését.' },
            { title: 'Törléshez való jog', text: 'Bizonyos feltételek fennállása esetén kérheti adatai törlését ("elfeledtetéshez való jog").' },
            { title: 'Adatkezelés korlátozása', text: 'Kérheti az adatkezelés korlátozását vitatott pontosság, jogellenes kezelés vagy tiltakozás esetén.' },
            { title: 'Adathordozhatóság', text: 'Kérheti adatait gépileg olvasható formátumban, illetve azok más adatkezelőhöz történő továbbítását.' },
            { title: 'Tiltakozáshoz való jog', text: 'Jogos érdeken alapuló adatkezelés esetén tiltakozhat az adatkezelés ellen.' },
            { title: 'Panaszjog', text: 'Jogsérelem esetén panaszt nyújthat be a NAIH-hoz (www.naih.hu).' },
          ].map((item, i) => (
            <div className="col-md-6" key={i}>
              <div className="p-3 h-100" style={{ border: '1px solid #e8e8e8' }}>
                <strong style={{ display: 'block', marginBottom: '0.3rem' }}>{item.title}</strong>
                <small style={{ color: '#555' }}>{item.text}</small>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Jogait az <a href="mailto:adatvedelem@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>adatvedelem@alkotasok-tara.hu</a>{' '}
          e-mail-címen, vagy postai úton (1052 Budapest, Példa utca 1.) gyakorolhatja. Az Adatkezelő a kérelmet
          <strong> 30 napon</strong> belül teljesíti; indokolt esetben ez 60 napra meghosszabbítható.
        </p>
      </section>

      {/* Adatbiztonság */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          5. Adatbiztonság
        </h2>
        <p>
          Az Adatkezelő technikai és szervezési intézkedéseket alkalmaz a személyes adatok védelme érdekében,
          különösen:
        </p>
        <ul>
          <li>Jelszavak bcrypt algoritmussal való titkosítása</li>
          <li>HTTPS/TLS titkosított adatátvitel</li>
          <li>E-mail-verifikáció regisztrációkor</li>
          <li>Hozzáférési jogosultságok korlátozása (szerepkör alapú hozzáférés)</li>
          <li>Rendszeres biztonsági mentések</li>
          <li>Adatbázis-szintű titkosítás</li>
        </ul>
        <p>
          Adatvédelmi incidens esetén az Adatkezelő a GDPR 33. cikke alapján 72 órán belül értesíti a NAIH-ot,
          és szükség esetén az érintetteket is haladéktalanul tájékoztatja.
        </p>
      </section>

      {/* Sütik */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          6. Sütik (cookie-k)
        </h2>
        <p>
          A Weboldal sütifájlokat használ a működéshez és a felhasználói élmény javításához.
          Részletes tájékoztatásért kérjük, olvassa el a{' '}
          <Link to="/cookies" style={{ color: '#1a1a1a' }}>Cookie tájékoztatót</Link>.
        </p>
      </section>

      <div className="alert" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 0 }}>
        <small className="text-muted">
          <strong>Kapcsolódó dokumentumok:</strong>{' '}
          <Link to="/terms" style={{ color: '#1a1a1a' }}>ÁSZF</Link>
          {' · '}
          <Link to="/cookies" style={{ color: '#1a1a1a' }}>Cookie tájékoztató</Link>
        </small>
      </div>
    </div>
  );
}

export default PrivacyPage;
