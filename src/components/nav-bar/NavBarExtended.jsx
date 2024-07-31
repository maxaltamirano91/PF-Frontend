import LogoutButton from '../logout-button/LogoutButton.jsx'
import { Gem } from 'lucide-react'
import { setDarkMode, setLightMode } from '../../redux/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavBarExtended = () => {
	const dispatch = useDispatch()
	const theme = useSelector((state) => state.themes.theme)
	const { loggedUser } = useSelector((state) => state.auth)

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
		theme === 'dark' ? darkMode() : lightMode()
	}, [theme])

	return (
		<div>
			<nav className="navbar navbar-expand-lg p-3 bg-body-tertiary">
				<div className="container-fluid">
					<Link to={'/'}>
						<span className="navbar-brand">ForDevs</span>
					</Link>
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
											<Link to={'/home'}>
												<span className="dropdown-item">Proyectos</span>
											</Link>
										</li>
										<li>
											<Link to={'/explorer/users'}>
												<span className="dropdown-item">Usuarios</span>
											</Link>
										</li>
										<li>
											{loggedUser?.role !== 'admin' && (
												<a className="dropdown-item" href="/myprofile?tab=contracts">
													Contratos
												</a>
											)}
										</li>
									</ul>
								</div>

								{/* --------------------------------- end Explorer ----------------------- */}
							</li>
							{loggedUser?.planName !== 'Premium' &&
								loggedUser?.role !== 'admin' && (
									<li className="nav-item">
										<Link to={'/premium'}>
											<span className="nav-link">ForDevsPro</span>
										</Link>
									</li>
								)}

							{loggedUser && loggedUser?.role === 'admin' && (
								<li className="nav-item">
									<Link to={'/dashboard'}>
										<span className="nav-link ">Admin-Console</span>
									</Link>
								</li>
							)}

							{loggedUser ?
								(<li className="nav-item">
									<Link to={'/create'}>
										<span className="nav-link ">Nuevo proyecto</span>
									</Link>
								</li>)
								: null
							}

						</ul>

						{loggedUser ? (
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
										Hola {loggedUser?.userName}
									</a>
									<ul className="dropdown-menu">
										<li>
											<Link className="dropdown-item" to={`/myprofile`}>
												<span className="nav-link ">
													Perfil{loggedUser?.planName === 'Premium' && <Gem />}
												</span>
											</Link>
										</li>
										<li>
											<a className="dropdown-item" href="/modUser">
												Editar perfil
											</a>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
										<li className="">
											<LogoutButton className="dropdown-item " />
										</li>
									</ul>
								</li>
							</ul>
						) : (
							//*-------------------- end login----------------*/
							// securePassword!

							//? ----------------Sign in / Sign Up -------------------*/
							<ul className="navbar-nav px-3">
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
						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									onClick={changeTheme}
									className="btn rounded-fill"
									style={{ margin: 0, padding: 0 }}
								>
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
