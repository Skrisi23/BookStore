import React from 'react';
import { Link } from 'react-router-dom';

function TermsPage() {
  return (
    <div className="container py-5" style={{ maxWidth: '860px' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none" style={{ color: '#1a1a1a' }}>Kezdőlap</Link>
          </li>
          <li className="breadcrumb-item active">ÁSZF</li>
        </ol>
      </nav>

      <h1 className="mb-1" style={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
        Általános Szerződési Feltételek
      </h1>
      <p className="text-muted mb-5" style={{ fontSize: '0.9rem' }}>
        Hatályos: 2026. január 1-től &nbsp;·&nbsp; Alkotások Tára Kft.
      </p>

      {/* 1 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          1. A Szolgáltató adatai
        </h2>
        <table className="table table-borderless" style={{ fontSize: '0.95rem' }}>
          <tbody>
            <tr><td style={{ width: '220px', color: '#555' }}>Cégnév:</td><td><strong>Alkotások Tára Kft.</strong></td></tr>
            <tr><td style={{ color: '#555' }}>Székhely:</td><td>1052 Budapest, Példa utca 1.</td></tr>
            <tr><td style={{ color: '#555' }}>E-mail:</td><td><a href="mailto:info@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>info@alkotasok-tara.hu</a></td></tr>
            <tr><td style={{ color: '#555' }}>Telefonszám:</td><td>+36 1 234 5678</td></tr>
            <tr><td style={{ color: '#555' }}>Weboldal:</td><td>www.alkotasok-tara.hu</td></tr>
            <tr><td style={{ color: '#555' }}>Adószám:</td><td>12345678-2-41</td></tr>
            <tr><td style={{ color: '#555' }}>Cégjegyzékszám:</td><td>01-09-123456</td></tr>
            <tr><td style={{ color: '#555' }}>Nyilvántartó hatóság:</td><td>Fővárosi Törvényszék Cégbírósága</td></tr>
          </tbody>
        </table>
      </section>

      {/* 2 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          2. Az ÁSZF hatálya és elfogadása
        </h2>
        <p>
          Jelen Általános Szerződési Feltételek (továbbiakban: <strong>ÁSZF</strong>) az Alkotások Tára Kft.
          (továbbiakban: <strong>Szolgáltató</strong>) által üzemeltetett <em>alkotasok-tara.hu</em> weboldalon
          (továbbiakban: <strong>Weboldal</strong>) elérhető könyvvásárlási és könyvkölcsönzési szolgáltatásokat igénybe vevő
          természetes és jogi személyek (továbbiakban: <strong>Felhasználó</strong>) jogait és kötelezettségeit szabályozzák.
        </p>
        <p>
          A Weboldal használatával, a regisztrációval, illetve bármely vásárlás vagy kölcsönzés leadásával a Felhasználó
          kijelenti, hogy az ÁSZF-et elolvasta, megértette és annak feltételeit magára nézve kötelezőnek fogadja el.
          Amennyiben a Felhasználó az ÁSZF feltételeivel nem ért egyet, a Weboldal vásárlási és kölcsönzési
          funkcióit nem jogosult igénybe venni.
        </p>
        <p>
          A Szolgáltató fenntartja a jogot, hogy az ÁSZF-et egyoldalúan módosítsa. A módosításokról a Felhasználókat
          e-mailben értesíti. A módosítások a közzétételt követő 15. napon lépnek hatályba; a módosítás hatályba lépése
          után leadott rendelések már az új feltételek szerint jönnek létre.
        </p>
      </section>

      {/* 3 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          3. Regisztráció és felhasználói fiók
        </h2>
        <p>
          A Weboldal vásárlási és kölcsönzési funkcióinak használatához regisztráció szükséges. A regisztráció során
          a Felhasználó köteles valódi, pontos és teljes adatait megadni. Hamis adatok megadása esetén a Szolgáltató
          jogosult a regisztrációt törölni.
        </p>
        <p>
          A regisztrációt követően a Felhasználó e-mailben kapott aktiváló linkkel erősíti meg fiókját. Az aktiválás
          elvégzéséig a fiók nem teljes értékű.
        </p>
        <p>
          A Felhasználó felelős a bejelentkezési adatai (különösen a jelszó) biztonságos kezeléséért és titkosságáért.
          A Felhasználó fiókjával elvégzett valamennyi cselekményért a Felhasználó felel. Jogosulatlan hozzáférés esetén
          a Felhasználó köteles haladéktalanul értesíteni a Szolgáltatót.
        </p>
        <p>
          Egy természetes személy kizárólag egy felhasználói fiókkal rendelkezhet. A Felhasználó fiókját bármikor
          törölheti; a törlés nem érinti a törlés előtt létrejött szerződéses jogviszonyokat.
        </p>
      </section>

      {/* 4 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          4. A könyvvásárlásra vonatkozó rendelkezések
        </h2>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>4.1 Termékek és árak</h3>
        <p>
          A Weboldalon feltüntetett árak forintban (HUF) értendők és tartalmazzák az általános forgalmi adót (ÁFA).
          A Szolgáltató az árakat és a termékek elérhetőségét előzetes értesítés nélkül megváltoztathatja; a megrendelés
          leadásának időpontjában érvényes ár az irányadó.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>4.2 A szerződés létrejötte</h3>
        <p>
          A kosárba helyezés és a fizetés véglegesítése kizárólag ajánlatnak minősül a Felhasználó részéről.
          A szerződés a Szolgáltató által küldött visszaigazoló e-maillel jön létre. A Szolgáltató fenntartja a jogát,
          hogy indokolt esetben (pl. raktárkészlet hiánya, nyilvánvaló árhiba) a megrendelést visszautasítsa.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>4.3 Fizetési módok</h3>
        <p>
          A Weboldal jelenleg online bankkártyás fizetést fogad el. A Felhasználó a fizetési adatait biztonságos,
          titkosított csatornán adja meg. A Szolgáltató a kártyaadatokat nem tárolja.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>4.4 Elállási jog</h3>
        <p>
          A fogyasztónak minősülő Felhasználó az elektronikus kereskedelemre vonatkozó jogszabályok alapján a termék
          kézhezvételétől számított <strong>14 naptári napon belül</strong> indokolás nélkül elállhat a vásárlástól.
          Az elállási szándékát a Felhasználó e-mailben közölheti a következő címen:{' '}
          <a href="mailto:info@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>info@alkotasok-tara.hu</a>.
        </p>
        <p>
          Az elállási jog <strong>nem gyakorolható</strong> olyan digitális tartalom esetén, amelynek szolgáltatása
          megkezdődött és a Felhasználó az elállási jog elvesztéséhez kifejezetten hozzájárult.
        </p>
      </section>

      {/* 5 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          5. A könyvkölcsönzésre vonatkozó rendelkezések
        </h2>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>5.1 A kölcsönzési jogviszony</h3>
        <p>
          A kölcsönzési szerződés a megrendelés visszaigazolásával jön létre. A Felhasználó a kölcsönzés során
          a könyv fizikai vagy digitális példányát meghatározott időtartamra ideiglenesen használhatja,
          de a tulajdonjog a Szolgáltatónál marad.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>5.2 Kölcsönzési időtartam</h3>
        <p>
          A kölcsönzési időtartamot a Felhasználó a kosárban állítja be; a minimum és maximum időtartamokat
          a Weboldal rögzíti. A kölcsönzési díjat a Felhasználó előre fizeti meg.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>5.3 Visszaküldési kötelezettség és késedelem</h3>
        <p>
          A Felhasználó köteles a kölcsönzött példányt a lejárati napig visszajuttatni. Késedelem esetén
          a Szolgáltató késedelmi díjat számíthat fel, amelynek mértékét a Weboldal árlistája tartalmazza.
          A Szolgáltató a lejárat előtt e-mailes emlékeztetőt küld a Felhasználónak.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>5.4 A példány állapota</h3>
        <p>
          A Felhasználó köteles a kölcsönzött példányt rendeltetésszerűen használni és eredeti állapotban
          visszaszolgáltatni. Rongálás, elvesztés esetén a Felhasználó köteles a könyv értékét megtéríteni.
        </p>
        <h3 className="h6 mt-3 mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>5.5 Elállás kölcsönzéstől</h3>
        <p>
          A kölcsönzési szerződéstől a Felhasználó a kölcsönzési időszak megkezdése előtt állhat el díjmentesen.
          A megkezdett kölcsönzési időszakra eső díj nem kerül visszatérítésre.
        </p>
      </section>

      {/* 6 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          6. Szellemi tulajdon
        </h2>
        <p>
          A Weboldal és az azon közzétett valamennyi tartalom (szöveg, kép, logó, felhasználói felület) a Szolgáltató
          vagy licencpartnereinek szellemi tulajdona, amelyeket szerzői jogi, védjegyoltalom és egyéb jogszabályok védenek.
          A tartalmak jogosulatlan másolása, terjesztése, módosítása vagy bármely más formájú felhasználása tilos.
        </p>
        <p>
          A Weboldalon értékesített és kölcsönzött könyvek tartalmát szerzői jogi védelem illeti meg.
          A Felhasználó kizárólag személyes, nem kereskedelmi célú felhasználásra jogosult.
        </p>
      </section>

      {/* 7 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          7. Felelősségkorlátozás
        </h2>
        <p>
          A Szolgáltató mindent megtesz a Weboldal zavartalan működéséért, de nem vállal felelősséget vis maior
          eseményekért, internetes hálózati zavarokért, harmadik fél által okozott adatvédelmi incidensekért, illetve
          a Weboldal karbantartása miatti ideiglenes elérhetetlenségért.
        </p>
        <p>
          A Szolgáltató felelőssége szándékos vagy súlyos gondatlan károkozás esetén fennáll; egyébként a felelősség
          az adott megrendelés értékére korlátozódik. A Felhasználó által megadott helytelen adatokból eredő
          következményekért a Szolgáltató nem felel.
        </p>
      </section>

      {/* 8 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          8. Panaszkezelés és jogérvényesítés
        </h2>
        <p>
          A Felhasználó panaszát elsősorban az{' '}
          <a href="mailto:info@alkotasok-tara.hu" style={{ color: '#1a1a1a' }}>info@alkotasok-tara.hu</a>{' '}
          e-mail-címen terjesztheti elő. A Szolgáltató a panaszt 30 napon belül megvizsgálja és érdemi választ ad.
        </p>
        <p>
          Ha a Felhasználó fogyasztónak minősül, panaszával a lakóhelye szerint illetékes <strong>Békéltető Testülethez</strong>{' '}
          is fordulhat. Az Európai Bizottság által fenntartott online vitarendezési platform (ODR) elérhető a{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={{ color: '#1a1a1a' }}>
            https://ec.europa.eu/consumers/odr
          </a>{' '}
          weboldalon.
        </p>
        <p>
          A felek megkísérlik a vitákat tárgyalás útján rendezni. Ha ez nem vezet eredményre, kizárólagos illetékességgel
          a <strong>Fővárosi Törvényszék</strong> jár el, az irányadó jog a magyar jog.
        </p>
      </section>

      {/* 9 */}
      <section className="mb-5">
        <h2 className="h4 mb-3" style={{ borderBottom: '2px solid #1a1a1a', paddingBottom: '0.5rem' }}>
          9. Irányadó jogszabályok
        </h2>
        <ul style={{ lineHeight: '2' }}>
          <li>2013. évi V. törvény – Polgári Törvénykönyv (Ptk.)</li>
          <li>2001. évi CVIII. törvény – az elektronikus kereskedelmi szolgáltatásokról (Eker. tv.)</li>
          <li>45/2014. (II. 26.) Korm. rendelet – a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól</li>
          <li>2011. évi CXII. törvény – az információs önrendelkezési jogról és az információszabadságról (Info tv.)</li>
          <li>(EU) 2016/679 rendelet – az általános adatvédelmi rendelet (GDPR)</li>
          <li>1999. évi LXXVI. törvény – a szerzői jogról</li>
        </ul>
      </section>

      <div className="alert" style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 0 }}>
        <small className="text-muted">
          <strong>Egyéb jogi dokumentumok:</strong>{' '}
          <Link to="/privacy" style={{ color: '#1a1a1a' }}>Adatvédelmi tájékoztató</Link>
          {' · '}
          <Link to="/cookies" style={{ color: '#1a1a1a' }}>Cookie tájékoztató</Link>
        </small>
      </div>
    </div>
  );
}

export default TermsPage;
