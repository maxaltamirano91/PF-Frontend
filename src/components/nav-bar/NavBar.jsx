import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode, setLightMode } from '../../redux/actions'
import LogoutButton from '../logout-button/LogoutButton'
import Filter from '../filter/Filter'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
	const dispatch = useDispatch()
	const { theme } = useSelector((state) => state.themes)
	const { token } = useSelector((state) => state.auth)
	const [navbar, setNavbar] = useState(false)

	const darkMode = () => {
		document.querySelector('html').setAttribute('data-bs-theme', 'dark')
		document.querySelector('#dl-icon').className = 'bi bi-sun-fill'
	}

	const lightMode = () => {
		document.querySelector('html').setAttribute('data-bs-theme', 'light')
		document.querySelector('#dl-icon').className = 'bi bi-moon-fill'
	}

	const changeTheme = () => {
		if (theme === 'light') {
			dispatch(setDarkMode())
		} else {
			dispatch(setLightMode())
		}
	}

	useEffect(() => {
		if (theme === 'dark') {
			darkMode()
		} else {
			lightMode()
		}
	}, [theme])

	const changeBackground = () => {
		if (window.scrollY >= 80) {
			setNavbar(true)
		} else {
			setNavbar(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', changeBackground)
		return () => {
			window.removeEventListener('scroll', changeBackground)
		}
	}, [])

	return (
		<nav
			className={`navbar navbar-expand-lg  ${
				navbar ? styles.bgDark : styles.bgTransparent
			}`}
			style={{ position: 'relative' }}
		>
			<div className="container-fluid">
				<a className="navbar-brand" to="/">
					ForDevs
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/home">
								Explorar
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/users">
								Users
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link disabled" to="#">
								Mis Proyectos
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/profile">
								Perfil
							</Link>
						</li>
					</ul>
					<Filter />
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							{token ? (
								<LogoutButton />
							) : (
								<Link className="nav-link" to="/login">
									Ingresar
								</Link>
							)}
						</li>
						{!token && (
							<li className="nav-item">
								<a className="nav-link" to="/register">
									Regístrate
								</a>
							</li>
						)}
						<li className="nav-item">
							<button onClick={changeTheme} className="btn rounded-fill">
								<i
									id="dl-icon"
									className={
										theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill'
									}
								></i>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
