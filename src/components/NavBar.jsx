import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode, setLightMode } from '../redux/actions'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './logoutButton'
import SearchBar from './SearchBar'
import Filter from './Filter'
import styles from '../utils/styles/LandingPage.module.css'

const NavBar = () => {
	const dispatch = useDispatch()
	const theme = useSelector((state) => state.theme.theme)
	const [navbar, setNavbar] = useState(false)
	const { isAuthenticated } = useAuth0()

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
			className={`navbar navbar-expand-lg fixed-top ${
				navbar ? styles.bgDark : styles.bgTransparent
			}`}
			style={{position:"relative"}}
		>
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
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
							<a className="nav-link active" aria-current="page" href="/home">
								Explorar
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/users">
								Users
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" href="#">
								Mis Proyectos
							</a>
						</li>
					</ul>
					<SearchBar />
					<Filter />
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							{isAuthenticated ? (
								<LogoutButton />
							) : (
								<a className="nav-link" href="/login">
									Ingresar
								</a>
							)}
						</li>
						{!isAuthenticated && (
							<li className="nav-item">
								<a className="nav-link" href="/register">
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