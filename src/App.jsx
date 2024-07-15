// import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './view/HomePage'
import Login from './view/Login'
import Register from './view/Register'
import ForgotPassword from './view/ForgotPassword'
import LandingPage from './view/LandingPage'
// import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import TestComponent from './components/TestComponent'
import Page404 from './view/Page404'
// import ProfileUser from './view/dashboard_User/ProfileUser/profileUser';
import NewProject from './components/NewProject'
import NavBarExtended from './components/NavBarExtended'

function App() {
	return (
		<>
			<div>
				<NavBarExtended />

				<Routes className="App">
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/newproject" element={<NewProject />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgotPassword" element={<ForgotPassword />} />
					<Route path="/*" element={<Page404 />} />
				</Routes>

				<Footer />
			</div>
		</>
	)
}

export default App
