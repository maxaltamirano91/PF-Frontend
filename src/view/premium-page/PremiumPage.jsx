import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faMoneyBillWave, faPercent, faCommentsDollar, faBriefcase, faRepeat, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import styles from './PremiumPage.module.css';

const image1Url = 'https://i.ibb.co/tYfrgKG/portfolio.png';
const image2Url = 'https://i.ibb.co/s51rcjF/Proyect-Proposal.png';
const image3Url = 'https://i.ibb.co/k265XpZ/imagen3.png';

function LandingPage() {
  useEffect(() => {
    const carousel = document.querySelector('#carouselExampleIndicators');
    if (carousel) {
      carousel.setAttribute('data-bs-interval', '5000');
    }
  }, []);

  return (
    <div>
      <header className={`${styles.heroSection} d-flex align-items-center justify-content-center`}>
        <div className="container text-center text-white">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-3">Potencia tu carrera con ForDevs Pro</h1>
              <p className="lead">
                0 % de tarifas de la plataforma, más funciones para que tu carrera creativa crezca y dar más visibilidad a tus proyectos.
              </p>
              <a href="register" className="btn btn-primary">
                Probar versión gratuita
              </a>
            </div>
            <div className="col-md-6">
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={image1Url} className="d-block w-100" alt="Slide 1" />
                  </div>
                  <div className="carousel-item">
                    <img src={image2Url} className="d-block w-100" alt="Slide 2" />
                  </div>
                  <div className="carousel-item">
                    <img src={image3Url} className="d-block w-100" alt="Slide 3" />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;

{/* <section className="container my-5">
<div className="row align-items-center">
  <div className="col-md-6">
    <h2>Muestra tu trabajo en tu propio sitio web</h2>
    <FontAwesomeIcon icon={faBriefcase} /> Publica hasta 5 sitios.<br />
    <FontAwesomeIcon icon={faRepeat} /> Importa tu trabajo desde ForDevs al instante<br />
    <a href="register" className="btn btn-primary">
      Probar versión gratuita
    </a>
  </div>
  <div className="col-md-6">
    <img src={image1Url} className="img-fluid" alt="Imagen adicional 1" />
  </div>
</div>
</section>
<section className="container my-5">
<div className="row align-items-center">
  <div className="col-md-6">
    <h2>Gana más dinero en ForDevs</h2>
    {/* <FontAwesomeIcon icon={faMoneyBillWave} /> 0 % de tarifas de plataforma en ForDevs para ventas de recursos<br />
    <FontAwesomeIcon icon={faPercent} /> 0 % de tarifa de la plataforma ForDevs para autónomos y sus clientes<br />
    <FontAwesomeIcon icon={faCommentsDollar} /> 0 % de tarifas de plataforma en ForDevs para suscripciones<br /> 
    <a href="register" className="btn btn-primary">
      Probar versión gratuita
    </a>
  </div>
  <div className="col-md-6">
    <img src={image2Url} className="img-fluid" alt="Imagen adicional 2" />
  </div>
</div>
</section>
<section className="container my-5">
<div className="row align-items-center">
  <div className="col-md-6">
    <h2>Testimonios</h2>
    <FontAwesomeIcon icon={faUserGroup} /> Descubre cómo nuestros servicios han transformado la experiencia de nuestros usuarios.
    Sus testimonios reflejan el impacto positivo que hemos logrado juntos.<br />
    <a href="register" className="btn btn-primary">
      Probar versión gratuita
    </a>
  </div>
  <div className="col-md-6">
    <img src={image3Url} className="img-fluid" alt="Imagen adicional 3" />
  </div>
</div>
</section>
<section className="text-center mt-5 mb-5">
<h1 className="display-4">Empieza la prueba gratuita de 7 días</h1>
<p className="lead">Lleva tus proyectos al siguiente nivel con ForDevs Pro.</p>
<div className="cards-section py-5">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">ForDevs</h5>
            <p className="card-text">
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Publica tus proyectos<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Ofrece servicios autónomos<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Envía propuestas a clientes<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Vende tus recursos<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Márcate como disponible para trabajar<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Accede a nuestra bolsa de trabajo autónomo y a tiempo completo<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Realiza transacciones en ForDevs con tarifas de plataforma del 15 al 30 %<br />
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">ForDevs Pro</h5>
            <p className="card-text">
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Publica tus proyectos<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Ofrece servicios como freelance<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Envía propuestas a clientes<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Vende tus recursos<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Marca tu disponibilidad para trabajar<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> 0% de tarifa de la plataforma ForDevs<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Proyectos protegidos por el seguro de calidad ForDevs<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Ganancias transferidas automáticamente<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Cuota de inscripción 20% más barata<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Tienes acceso a la bolsa de trabajo freelance<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Accede a la bolsa de trabajo de tiempo completo<br />
              <FontAwesomeIcon icon={faCheck} style={{ color: '#63E6BE' }} /> Realiza transacciones en ForDevs<br />
            </p>
            <a href="plan-premium" className="btn btn-primary">Probar versión Pro</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section> */}
