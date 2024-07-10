// import React from 'react';
import { Link } from 'react-router-dom'
// import SearchBar from './SearchBar';
import { useState, useEffect } from 'react'

const NavBar = () => {
	const [navbar, setNavbar] = useState(false)

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
		<nav className={`navbar navbar-expand-lg ${navbar ? 'bg-black' : 'bg-transparent'} fixed-top`}>
			<div className="container-fluid">
				<Link to={'/'}>
					<a className="navbar-brand text-white " href="#">
						ForDevs
					</a>
				</Link>

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
					<ul className="navbar-nav ms-auto">
						<li className="nav-item ">
							<Link to={'/home'}>
								<a className="nav-link active text-white" aria-current="page" href="#">
									Home
								</a>
							</Link>
						</li>
						<li className="nav-item ">
							<a className="nav-link text-white" href="#">
								Proyectos
							</a>
						</li>
						<li className="nav-item">
							<Link to={'/login'}>
								<a className="nav-link text-white" href="#">
									Log In
								</a>
							</Link>
						</li>
						<li className="nav-item">
							<a className="nav-link text-white" href="#">
								Regístrate
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
