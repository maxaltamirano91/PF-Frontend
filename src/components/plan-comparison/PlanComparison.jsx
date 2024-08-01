import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './PlanComparison.module.css'
import ArgentinaFlag from './argentina-flag.png'

const PlanComparison = () => {
	const { loggedUser } = useSelector((state) => state.auth)

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Comparación de Planes</h2>
			<div className={styles.grid}>
				<div className={styles.card}>
					<div className={styles.cardBody}>
						<h5 className={styles.cardTitle}>ForDevs</h5>
						<div className={styles.cardText}>
							<div className={styles.price}>
								<img
									src={ArgentinaFlag}
									alt="Argentina Flag"
									className={styles.flag}
								/>{' '}
								$0 / mensuales
							</div>
							<ul className={styles.list}>
								<span />
								<span />
								<span />
								<span />
								<li className={styles.listItem}>Publica tus proyectos</li>
								<li className={styles.listItem}>
									Ofrece servicios como freelance
								</li>
								<li className={styles.listItem}>
									Transacciones en ForDevs con tarifas del 15 al 30%
								</li>
								<li className={styles.listItem}>
									Tienes acceso a la bolsa de trabajo
								</li>
								<li className={`${styles.listItem} text-muted`}>
									<del>Proyectos protegidos con contraseña</del>
								</li>
								<li className={`${styles.listItem} text-muted`}>
									<del>Insignia Pro</del>
								</li>
								<li className={`${styles.listItem} text-muted`}>
									<del>Contrata a otros programadores</del>
								</li>
								<li className={`${styles.listItem} text-muted`}>
									<del>Dejá reviews en proyectos</del>
								</li>
							</ul>
						</div>
						{loggedUser ? (
							<Link to="/home" className="btn btn-primary">
								Probar versión gratuita
							</Link>
						) : (
							<Link to="/register" className="btn btn-primary">
								Probar versión gratuita
							</Link>
						)}
					</div>
				</div>
				<div className={`${styles.card} ${styles.proCard}`}>
					<div className={styles.mostPopularButton}>Más popular</div>
					<div className={styles.cardBody}>
						<h5 className={styles.cardTitle}>ForDevs Pro</h5>
						<div className={styles.price}>
							<img
								src={ArgentinaFlag}
								alt="Argentina Flag"
								className={styles.flag}
							/>{' '}
							$1350 / mensuales
						</div>
						<div className={styles.cardText}>
							<ul className={styles.list}>
								<li className={styles.listItem}>Publica tus proyectos</li>
								<li className={styles.listItem}>
									Ofrece servicios como freelance
								</li>
								<li className={styles.listItem}>
									0% de tarifa de la plataforma ForDevs
								</li>
								<li className={styles.listItem}>
									Tienes acceso a la bolsa de trabajo
								</li>
								<li className={styles.listItem}>
									Proyectos protegidos con contraseña
								</li>
								<li className={styles.listItem}>Insignia Pro</li>
								<li className={styles.listItem}>
									Contratá a otros programadores
								</li>
								<li className={styles.listItem}>Dejá reviews en proyectos</li>
							</ul>
						</div>
						{loggedUser ? (
							<Link to="/subscription" className="btn btn-primary">
								Probar versión Pro
							</Link>
						) : (
							<Link to="/register" className="btn btn-primary">
								Probar versión Pro
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlanComparison
