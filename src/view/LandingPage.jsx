import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../utils/styles/LandingPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function LandingPage() {
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
							<a href="#" className="btn btn-primary">
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
										<img
											src="https://media.istockphoto.com/id/1416797815/es/foto/golden-n%C3%BAmero-uno.jpg?s=1024x1024&w=is&k=20&c=EoMLATi8644HCy3K5IQB_QNEG_rN5qvQN9jByd19L0s="
											className="d-block w-100"
											alt="..."
										/>
									</div>
									<div className="carousel-item">
										<img
											src="https://www.shutterstock.com/shutterstock/photos/1890767737/display_1500/stock-photo--d-render-number-two-glowing-in-the-dark-pink-blue-neon-light-1890767737.jpg"
											className="d-block w-100"
											alt="..."
										/>
									</div>
									<div className="carousel-item">
										<img src="https://via.placeholder.com/600x400" className="d-block w-100" alt="..." />
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
			<div className="text-center mt-5 mb-5">
				<h1 className="display-4">Empezá la prueba gratuita de 7 días</h1>
				<p className="lead">Lleva tus proyectos al siguiente nivel con ForDevs Pro.</p>
				<section className="cards-section py-5">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">
											ForDevs
										</h5>
										<p className="card-text">
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Publica tus proyectos<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Ofrece servicios autónomos<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Envía  propuestas a clientes<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Vende tus recursos<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Márcate como disponible para trabajar<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Accede a nuestra bolsa de trabajo autónomo y a tiempo completo<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Realiza transacciones en Behance con tarifas de plataforma del 15 al 30 %<br />
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">
											ForDevs Pro
										</h5>
										<p className="card-text">
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Publica tus proyectos<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Ofrece servicios como freelance<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Envía propuestas a clientes<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Vende tus recursos<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Marca tu disponibilidad para trabajar<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> 0% de tarifa de la plataforma ForDevs<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Proyectos protegidos con contraseña<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Proyectos solo con enlace<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Insignia profesional<br />
											<FontAwesomeIcon icon={faCheck} style={{ color: "#63E6BE" }} /> Secciones de perfil<br />
										</p>
										<a href="#" className="btn btn-primary">
											Probar versión Pro
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default LandingPage;
