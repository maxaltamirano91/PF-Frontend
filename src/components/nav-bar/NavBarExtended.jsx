// import SearchBar from './SearchBar'
import LogoutButton from '../logout-button/LogoutButton.jsx'

import { logout } from '../../redux/actions.js'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setDarkMode, setLightMode } from '../../redux/actions'

const NavBarExtended = () => {
	const dispatch = useDispatch()
	const theme = useSelector((state) => state.theme.theme)
	const [navbar, setNavbar] = useState(false)
	const authToken = useSelector((state) => state.auth.authToken)

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

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<div className="">
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<Link to={'/home'}>
						<span className="navbar-brand">ForDevs</span>
					</Link>
					{/* ----------------------SearchBar  Movil ----------------- */}
					{/* <form className="d-flex me-auto d-sm-none " role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form> */}
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
								{/* --------------------------------- Explorer----------------------- */}
								{/* <Link to={'/home'}>
									<span className="nav-link active">Explorar</span>
								</Link> */}
								<div className="dropdown">
									<a
										className="btn btn-light dropdown-toggle"
										href="#"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Explorar
									</a>

									<ul className="dropdown-menu">
										<li>
											<Link to={'/users'}>
												<span className="dropdown-item">Usuarios</span>
											</Link>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Tecnologías
											</a>
										</li>
										<li>
											<a className="dropdown-item" href="#">
												Something else here
											</a>
										</li>
									</ul>
								</div>

								{/* --------------------------------- end Explorer ----------------------- */}
							</li>
							<li className="nav-item">
								<Link to={'/'}>
									<span className="nav-link">ForDevPro</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link to={'/myprofile'}>
									<span className="nav-link ">Mis Proyectos</span>
								</Link>
							</li>{' '}
							<li className="nav-item">
								<Link to={'/admindashboad'}>
									<span className="nav-link ">Admin-Console</span>
								</Link>
							</li>
						</ul>

						{/* ----------------------SearchBar  Desktop ----------------- */}
						{/* <form className="d-flex me-auto " role="search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button className="btn btn-outline-success" type="submit">
								Search
							</button>
						</form> */}
						{/* ----------------------end ----------------- */}

						{authToken ? (
							//? -------------------- login ----------------
							<ul className="navbar-nav mb-2 mb-lg-0">
								<li className="nav-item dropdown">
									<a
										className="nav-link dropdown-toggle mx-3"
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
												Ajustes
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
										<li className="">
											<a
												onClick={handleLogout}
												className="dropdown-item"
												href=""
											>
												salir
											</a>
											<hr className="dropdown-divider" />
											<LogoutButton className="dropdown-item " />
										</li>
									</ul>
								</li>
							</ul>
						) : (
							//*-------------------- end login----------------*/
							// securePassword!

							//? ----------------Sign in / Sign Up -------------------*/
							<ul className="navbar-nav   ">
								<li className="nav-item">
									<Link to={'/login'}>
										<span className="nav-link">Ingresar</span>
									</Link>
								</li>
								<li className="nav-item">
									<Link to={'/register'}>
										<span className="nav-link">Regístrate</span>
									</Link>
								</li>
							</ul>
							//* ----------------End -------------------*/
						)}

						{/*--------- Theme------------------- */}
						<ul className="navbar-nav  ">
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
		</div>
	)
}

export default NavBarExtended
