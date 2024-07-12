import styles from '../utils/styles/LandingPage.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode, setLightMode } from '../redux/actions'
import SearchBar from './SearchBar'

const TestComponent = () => {
	const dispatch = useDispatch()
	const theme = useSelector((state) => state.theme.theme)
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
		<div className="my-5">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Remplazo
					</a>
					{/* ----------------------SearchBar  Movil ----------------- */}
					<form className="d-flex me-auto d-sm-none " role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
					{/* ----------------------end ----------------- */}
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="#">
									Explorar
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Precios
								</a>
							</li>

							<li className="nav-item">
								<a
									className="nav-link "
									aria-disabled="true"
									href="/newproject"
								>
									Agregar proyecto
								</a>
							</li>
						</ul>

						{/* ----------------------SearchBar  Desktop ----------------- */}
						<form className="d-flex me-auto " role="search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form>
						{/* ----------------------end ----------------- */}

						{/* ----------------Sign in / Sign Up -------------------*/}
						<ul className="navbar-nav   ">
							<li className="nav-item">
								<a className="nav-link" href="/login">
									Ingresar
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/register">
									Regístrate
								</a>
							</li>
						</ul>
						{/* ----------------End -------------------*/}

						{/*-------------------- loging ----------------*/}
						<ul className="navbar-nav mb-2 mb-lg-0 d-none ">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Hola, User
								</a>
								<ul className="dropdown-menu">
									<li>
										<a className="dropdown-item" href="#">
											Action
										</a>
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Another action
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a className="dropdown-item" href="#">
											Salir
										</a>
									</li>
								</ul>
							</li>
						</ul>
						{/*-------------------- end ----------------*/}

						{/*--------- Theme------------------- */}
						<ul className="navbar-nav  ">
							<li className="nav-item">
								<button onClick={changeTheme} className="btn rounded-fill">
									<i id="dl-icon" className="bi bi-moon-fill"></i>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<div className="my-5">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
					culpa odio vitae velit minima fugiat. Voluptas sed modi facere
					perspiciatis mollitia sint aliquid fuga adipisci. Ipsa in ratione
					deleniti atque!
				</p>
			</div>
		</div>
	)
}

export default TestComponent
