// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from "react-redux";
import './App.css'

import Error from "./components/Error";
import HomePage from './view/HomePage'
import Login from './view/Login'
import Register from './view/Register'
import ForgotPassword from './view/ForgotPassword'
import LandingPage from './view/LandingPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
// import TestComponent from './components/TestComponent'
import Page404 from './view/Page404'
import NewProject from './components/NewProject'
import ModProject from './view/ModProject'
import Users from './components/User/Users'




function App() {
	const { fetchError } = useSelector((state) => state.errors);
	return (
		<>
			<div>
				{fetchError && <Error error={fetchError} />}
				<NavBar />

				<Routes className="App">
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/newproject" element={<NewProject />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgotPassword" element={<ForgotPassword />} />
					<Route path="/modProject" element={<ModProject />} />
					<Route path="/*" element={<Page404 />} />
					<Route path="/users" element={<Users />} />

				</Routes>

				<Footer />
			</div>
		</>
	)
}

export default App
