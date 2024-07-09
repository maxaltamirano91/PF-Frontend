import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import styles from '../utils/styles/LandingPage.module.css';

function LandingPage() {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${navbar ? 'bg-black': 'bg-transparent'} fixed-top`}>
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">ForDevs</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ">
                <a className="nav-link active text-white" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link text-white" href="#">Proyectos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Log In</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Registrate</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className={`${styles.heroSection} d-flex align-items-center justify-content-center`}>
        <div className="container text-center text-white">
          <div className="row align-items-center">
            <div className="col-md-6">
            <h1 className="display-4">Potencia tu carrera con ForDevs Pro</h1>
            <p className="lead">Dale más visibilidad a tus proyectos.</p>
            </div>
            <div className="col-md-6">
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="https://media.istockphoto.com/id/1416797815/es/foto/golden-n%C3%BAmero-uno.jpg?s=1024x1024&w=is&k=20&c=EoMLATi8644HCy3K5IQB_QNEG_rN5qvQN9jByd19L0s=" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="https://www.shutterstock.com/shutterstock/photos/1890767737/display_1500/stock-photo--d-render-number-two-glowing-in-the-dark-pink-blue-neon-light-1890767737.jpg" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="https://via.placeholder.com/600x400" className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
          <div className="text-center">
            <h1 className="display-4">Empezá la prueba gratuita de 7 días </h1>
      <p className="lead">Lleva tus proyectos al siguiente nivel con ForDevs Pro. </p>
      <section className="cards-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">ForDevs</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">ForDevs Pro</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Probar versión Pro</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default LandingPage;
