import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import Error from './components/error/Error'
import Footer from './components/footer/Footer'
import NavBarExtended from './components/nav-bar/NavBarExtended'
import HomePage from './view/home-page/HomePage'
import ProfilePage from './view/profile-page/ProfilePage'
import LoginPage from './view/login-page/LoginPage'
import RegisterPage from './view/register-page/RegisterPage'
import ForgotPasswordPage from './view/forgot-password-page/ForgotPasswordPage'
import LandingPage from './view/landing-page/LandingPage'
import NotFoundPage from './view/not-found-page/NotFoundPage'
import UpdateProjectPage from './view/update-project-page/UpdateProjectPage'
import UsersPage from './view/users-page/UsersPage'
import CreateProjectPage from './view/create-project-page/CreateFormPage'
import useAuth0TokenHandler from './hooks/useAuth0TokenHandler'
import ProjectDetailPage from './view/project-detail-page/ProjectDetailPage'
import AdminBar from './components/admin-bar/AdminBar'
import AdminView from './components/admin-view/AdminView'

import Filter from './components/filter/Filter'

function App() {
	const { isLoading } = useAuth0()
	const location = useLocation()
	useAuth0TokenHandler()

	if (isLoading) return <div>Loading...</div>

	const showFilter = ['/home', '/users'].includes(location.pathname)

	return (
		<>
			<div>
				<Error />
				<NavBarExtended />
				{showFilter && <Filter />}

				<Routes className="App">
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<HomePage />} />
					{/* // ? EXplorer -- */}
					<Route path="/users" element={<UsersPage />} />
					{/* --- ---- */}
					<Route path="/myprofile" element={<ProfilePage />} />
					<Route path="/admindashboad" element={<AdminBar />} />

					<Route path="/create" element={<CreateProjectPage />} />
					<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
					<Route path="/adminView/:data" element={<AdminView />} />
					<Route path="/modProject/:id" element={<UpdateProjectPage />} />
					<Route path="/project/:id" element={<ProjectDetailPage />} />

					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
				<Footer />
			</div>
		</>
	)
}

export default App
