import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'

import styles from './PremiumPage.module.css'
import PlanComparison from '../../components/plan-comparison/PlanComparison'

const image1Url = 'https://i.ibb.co/tYfrgKG/portfolio.png'
const image2Url = 'https://i.ibb.co/s51rcjF/Proyect-Proposal.png'
const image3Url = 'https://i.ibb.co/k265XpZ/imagen3.png'

const PremiumPage = () => {
	useEffect(() => {
		const carousel = document.querySelector('#carouselExampleIndicators')
		if (carousel) {
			carousel.setAttribute('data-bs-interval', '5000')
		}
	}, [])

	return (
		<div className="w-100">
			<header
				className={`${styles.heroSection} d-flex align-items-center justify-content-center`}
			>
				<div className="container text-center text-white">
					<div className="row align-items-center">
						<div className="col-md-6">
							<h1 className="display-3">Potencia tu carrera con ForDevs Pro</h1>
							<p className="lead">
								0 % de tarifas de la plataforma, más funciones para que tu
								carrera creativa crezca y dar más visibilidad a tus proyectos.
							</p>

							<a href="#plan-comparison" className="btn btn-primary">
								Conoce DevPro
							</a>
						</div>
						<div className="col-md-6">
							<div
								id="carouselExampleIndicators"
								className="carousel slide"
								data-bs-ride="carousel"
							>
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
											src={image1Url}
											className="d-block w-100"
											alt="Slide 1"
										/>
									</div>
									<div className="carousel-item">
										<img
											src={image2Url}
											className="d-block w-100"
											alt="Slide 2"
										/>
									</div>
									<div className="carousel-item">
										<img
											src={image3Url}
											className="d-block w-100"
											alt="Slide 3"
										/>
									</div>
								</div>
								<button
									className="carousel-control-prev"
									type="button"
									data-bs-target="#carouselExampleIndicators"
									data-bs-slide="prev"
								>
									<span
										className="carousel-control-prev-icon"
										aria-hidden="true"
									></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button
									className="carousel-control-next"
									type="button"
									data-bs-target="#carouselExampleIndicators"
									data-bs-slide="next"
								>
									<span
										className="carousel-control-next-icon"
										aria-hidden="true"
									></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			<section className="container my-5">
				<div className="row align-items-center">
					<div className="col-md-6">
						<h2>Gana más dinero en ForDevs</h2>
						<p>
							0 % de tarifas de plataforma en ForDevs para ventas de recursos
						</p>
						<p>
							0 % de tarifa de la plataforma ForDevs para autónomos y sus
							clientes
						</p>
						<p>0 % de tarifas de plataforma en ForDevs para suscripciones</p>
					</div>
					<div className="col-md-6">
						<img
							src={image2Url}
							className="img-fluid"
							alt="Imagen adicional 2"
						/>
					</div>
				</div>
			</section>
			<section className="container my-5">
				<div className="row align-items-center">
					<div className="col-md-6">
						<h2>Testimonios</h2>
						<p>
							Descubre cómo nuestros servicios han transformado la experiencia
							de nuestros usuarios. Sus testimonios reflejan el impacto positivo
							que hemos logrado juntos.
						</p>
					</div>
					<div className="col-md-6">
						<img
							src={image3Url}
							className="img-fluid"
							alt="Imagen adicional 3"
						/>
					</div>
				</div>
			</section>
			<section className="text-center mt-5 mb-5">
				<h1 className="display-4">Empieza la prueba gratuita de 7 días</h1>
				<p className="lead">
					Lleva tus proyectos al siguiente nivel con ForDevs Pro.
				</p>
				<div id="plan-comparison">
					<PlanComparison />
				</div>
			</section>
		</div>
	)
}

export default PremiumPage
