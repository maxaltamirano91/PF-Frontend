import styles from './ProFooter.module.css'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'

const ProFooter = () => {
	const { loggedUser } = useSelector((state) => state.auth)
	const { pathname } = useLocation()

	if (loggedUser?.planName !== 'Premium') {
		if (pathname === '/home' || pathname === '/explorer/users') {
			return (
				<>
					{loggedUser?.role !== 'admin' && (
						<div className={styles.proFooter}>
							<div>
								<h3>
									Obtené tus beneficios <br />
									Accediendo a ForDevs Premium
								</h3>
								<Link to="/premium" className="w-100">
									<button className="btn btn-primary">Ver más</button>
								</Link>
							</div>
						</div>
					)}
				</>
			)
		}
	}

	if (pathname === '/explorer/users') {
		return (
			<div className={`${styles.proFooter} text-center mt-4`}>
				<span>No se encontraron usuarios que coincidan con tu búsqueda.</span>
				<span className="fw-bold">
					Te recomendamos explorar estos otros temas:
				</span>
				<Link to="/home">Proyectos</Link>
			</div>
		)
	}

	if (pathname === '/home') {
		return (
			<div className={`${styles.proFooter} text-center mt-4`}>
				<span>No se encontraron proyectos que coincidan con tu búsqueda.</span>
				<span className="fw-bold">
					Te recomendamos explorar estos otros temas:
				</span>
				<Link to="/explorer/users">Usuarios</Link>
			</div>
		)
	}

	return null
}

export default ProFooter
