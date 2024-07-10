// import React from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './view/HomePage'
import Login from './view/Login'
import Register from './view/Register'
import ForgotPassword from './view/ForgotPassword'
import LandingPage from './view/LandingPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import TestComponent from './components/TestComponent'

function App() {
	const { pathname } = useLocation()

	// * Incluir la ruta que donde deseamos ver NavBarAndFooter
	const showNavBarAndFooter = [
		'/',
		'/home',
		'/login',
		'/register',
		'/forgotPassword',
	].includes(pathname)

	return (
		<>
			<div>
				{showNavBarAndFooter && <NavBar />}

				<Routes className="App">
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgotPassword" element={<ForgotPassword />} />
				</Routes>

				{showNavBarAndFooter && <Footer />}
			</div>
		</>
	)
}

export default App
