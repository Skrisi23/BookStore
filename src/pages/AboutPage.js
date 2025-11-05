
import React from 'react';

function AboutPage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="card-title mb-4 text-center">
                <i className="bi bi-info-circle me-2"></i>
                Rólunk
              </h1>

              <p className="lead text-center mb-5">
                Üdvözlünk a <strong>BookStore</strong>-ban - a modern online könyvesboltban!
              </p>

              <h4 className="mt-4 mb-3">
                <i className="bi bi-bullseye me-2 text-primary"></i>
                Küldetésünk
              </h4>
              <p>
                A BookStore célja, hogy megkönnyítse az olvasók számára a könyvek elérését.
                Akár vásárolni, akár kölcsönözni szeretnél, nálunk minden megtalálható egy helyen.
                Hiszünk abban, hogy a könyvek mindenki számára elérhetőek legyenek.
              </p>

              <h4 className="mt-4 mb-3">
                <i className="bi bi-star me-2 text-primary"></i>
                Miért válassz minket?
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Széles választék:</strong> Több kategóriában is találsz könyveket
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Gyors szállítás:</strong> 24-48 órán belül kézhez kapod a rendelésed
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Kölcsönzés:</strong> Ha csak olvasni szeretnél, kölcsönözd ki kedvező áron
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Biztonságos fizetés:</strong> Többféle fizetési mód közül választhatsz
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  <strong>Ügyfélszolgálat:</strong> Mindig rendelkezésedre állunk
                </li>
              </ul>

              <h4 className="mt-4 mb-3">
                <i className="bi bi-book me-2 text-primary"></i>
                Kategóriáink
              </h4>
              <p>
                Kínálatunkban megtalálhatók:
              </p>
              <div className="row">
                <div className="col-md-6">
                  <ul>
                    <li>Fantasy</li>
                    <li>Sci-Fi</li>
                    <li>Krimi</li>
                    <li>Romantikus</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>Történelmi</li>
                    <li>Thriller</li>
                    <li>Klasszikus</li>
                    <li>...és még sok más!</li>
                  </ul>
                </div>
              </div>

              <h4 className="mt-4 mb-3">
                <i className="bi bi-gear me-2 text-primary"></i>
                Technológia
              </h4>
              <p>
                A BookStore egy modern React alkalmazás, amely Bootstrap 5-öt használ a
                dizájnhoz. Az alkalmazás teljes mértékben reszponzív és minden eszközön
                kiválóan működik.
              </p>

              <div className="alert alert-info mt-4">
                <h5 className="alert-heading">
                  <i className="bi bi-question-circle me-2"></i>
                  Kérdésed van?
                </h5>
                <p className="mb-0">
                  Keress minket bizalommal az{' '}
                  <strong>info@bookstore.hu</strong> email címen vagy hívj minket
                  a <strong>+36 1 234 5678</strong> telefonszámon!
                </p>
              </div>

              <div className="text-center mt-5">
                <h5 className="mb-3">Kövesd be a közösségi médiában is!</h5>
                <button className="btn btn-outline-primary btn-lg me-2">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className="btn btn-outline-info btn-lg me-2">
                  <i className="bi bi-twitter"></i>
                </button>
                <button className="btn btn-outline-danger btn-lg">
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
