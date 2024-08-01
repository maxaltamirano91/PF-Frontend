import styles from './ProFooter.module.css'
import { useSelector } from 'react-redux'

import { useLocation, Link } from 'react-router-dom'

const ProFooter = ({ loading }) => {
	const { loggedUser } = useSelector((state) => state.auth)
	const { theme } = useSelector((state) => state.themes)
	const { pathname } = useLocation()

	if (loggedUser?.planName !== 'Premium' && loggedUser?.role !== 'admin') {
		if (pathname === '/home' || pathname === '/explorer/users') {
			return (
				<div className={`${styles.proFooter} ${pathname === '/explorer/users' && styles.addStyle}`}>
					<div
						style={
							theme === 'light'
								? { backgroundColor: '#e9ecef' }
								: { backgroundColor: '#343a40' }
						}
					>
						<h3>
							Obtené tus beneficios <br />
							Accediendo a ForDevs Premium
						</h3>
						<Link to="/premium" className="w-100">
							<button className="btn btn-primary">Ver más</button>
						</Link>
					</div>
				</div>
			)
		}
	}

	if (pathname === '/explorer/users') {
		return (
			<div className="mt-5">
				<br />
				<br />
				<br />
				{!loading ? (
					<div className={`${styles.proFooter} text-center mt-4`}>
						<span>
							No se encontraron usuarios que coincidan con tu búsqueda.
						</span>
						<span className="fw-bold">
							Te recomendamos explorar estos otros temas:
						</span>
						<Link to="/home">Proyectos</Link>
					</div>
				) : (
					<div className="d-flex justify-content-center mb-3">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</div>
				)}
			</div>
		)
	}

	if (pathname === '/home') {
		return (
			<div className="mt-5">
				<br />
				<br />
				<br />
				{!loading ? (
					<div className={`${styles.proFooter} text-center mt-4`}>
						<span>
							No se encontraron proyectos que coincidan con tu búsqueda
						</span>
						<span className="fw-bold">
							Te recomendamos explorar estos otros temas:
						</span>
						<Link to="/explorer/users">Usuarios</Link>
					</div>
				) : (
					<div className="d-flex justify-content-center mb-3">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
					</div>
				)}
			</div>
		)
	}

	return null
}

export default ProFooter
