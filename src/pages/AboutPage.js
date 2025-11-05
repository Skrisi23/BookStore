import React from 'react';

function AboutPage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Rólunk</h2>
              <p className="lead">
                Üdvözöljük a BookStore alkalmazásban!
              </p>
              <p>
                Ez egy modern React alapú könyvtár kezelő rendszer, amely lehetővé teszi
                könyvek és szerzők egyszerű kezelését.
              </p>
              <h4 className="mt-4">Funkciók:</h4>
              <ul>
                <li>Könyvek hozzáadása, szerkesztése és törlése</li>
                <li>Szerzők kezelése</li>
                <li>Könyvek és szerzők összekapcsolása</li>
                <li>Modern, reszponzív felület Bootstrap használatával</li>
              </ul>
              <h4 className="mt-4">Technológiák:</h4>
              <ul>
                <li>React 18</li>
                <li>Bootstrap 5</li>
                <li>PHP backend API</li>
                <li>MySQL adatbázis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
