import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

// import Success from './components/success/Success'
// import Error from './components/error/Error'
import Footer from './components/footer/Footer'
import NavBarExtended from './components/nav-bar/NavBarExtended'
import HomePage from './view/home-page/HomePage'
import ProfilePage from './view/profile-page/ProfilePage'
import LoginPage from './view/login-page/LoginPage'
import RegisterPage from './view/register-page/RegisterPage'
import ForgotPasswordPage from './view/forgot-password-page/ForgotPasswordPage'
import PremiumPage from './view/premium-page/PremiumPage'
import NotFoundPage from './view/not-found-page/NotFoundPage'
import UpdateProjectPage from './view/update-project-page/UpdateProjectPage'
import UsersPage from './view/users-page/UsersPage'
import CreateProjectPage from './view/create-project-page/CreateProjectPage'
import useAuth0TokenHandler from './hooks/useAuth0TokenHandler'
import ProjectDetailPage from './view/project-detail-page/ProjectDetailPage'
import AdminView from './view/admin-view/AdminView'
import SubscriptionPage from './view/subscription-page/subscriptionPage'
import PaymentSuccessPage from './view/payment-success-page/PaymentSuccessPage'
import PaymentFailurePage from './view/payment-failure-page/PaymentFailurePage'
import PaymentPendingPage from './view/payment-pending-page/PaymentPendingPage'

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
				{/* <Success />
				<Error /> */}
				<NavBarExtended />
				{showFilter && <Filter />}

				<Routes className="App">
					<Route path="/" element={<PremiumPage />} />
					<Route path="/home" element={<HomePage />} />
					{/* // ? Explorer -- */}
					<Route path="/explorer/users" element={<UsersPage />} />
					{/* --- ---- */}
					<Route path="/myprofile" element={<ProfilePage />} />

					<Route path="/create" element={<CreateProjectPage />} />
					<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
					<Route path="/dashboard/:data" element={<AdminView />} />
					<Route path="/modProject/:id" element={<UpdateProjectPage />} />
					<Route path="/project/:id" element={<ProjectDetailPage />} />

					<Route path="/premium" element={<PremiumPage />} />

					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route path="/*" element={<NotFoundPage />} />

					<Route path="/subscription" element={<SubscriptionPage />} />
					<Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
					<Route path="/paymentFailure" element={<PaymentFailurePage />} />
					<Route path="/paymentPending" element={<PaymentPendingPage />} />
				</Routes>
				<Footer />
			</div>
		</>
	)
}

export default App

// ------------------------  no borrar de aqui para abajo. Att luis.-

// import { Routes, Route } from 'react-router-dom'

// import Error from './components/error/Error'
// import Footer from './components/footer/Footer'
// import NavBarExtended from './components/nav-bar/NavBarExtended'
// import HomePage from './view/home-page/HomePage'
// import ProfilePage from './view/profile-page/ProfilePage'
// import LoginPage from './view/login-page/LoginPage'
// import RegisterPage from './view/register-page/RegisterPage'
// import ForgotPasswordPage from './view/forgot-password-page/ForgotPasswordPage'
// import LandingPage from './view/landing-page/LandingPage'
// import NotFoundPage from './view/not-found-page/NotFoundPage'
// import UpdateProjectPage from './view/update-project-page/UpdateProjectPage'
// import UsersPage from './view/users-page/UsersPage'
// import CreateProjectPage from './view/create-project-page/CreateProjectPage'
// import ProjectDetailPage from './view/project-detail-page/ProjectDetailPage'
// import useAuth0TokenHandler from './hooks/useAuth0TokenHandler'
// import AdminBar from './components/admin-bar/AdminBar'
// import AdminView from './view/admin-view/AdminView'
// import SubscriptionPage from './view/subscription-page/subscriptionPage'

// function App() {
// 	useAuth0TokenHandler()
// 	return (
// 		<>
// 			<div>
// 				<Error />
// 				<NavBarExtended />
// 				<AdminBar />
// 				<Routes className="App">
// 					<Route path="/" element={<LandingPage />} />
// 					<Route path="/create" element={<CreateProjectPage />} />
// 					<Route path="/home" element={<HomePage />} />
// 					<Route path="/login" element={<LoginPage />} />
// 					<Route path="/register" element={<RegisterPage />} />
// 					<Route path="/forgotPassword" element={<ForgotPasswordPage />} />
// 					<Route path="/adminView/:data" element={<AdminView />} />
// 					<Route path="/modProject/:id" element={<UpdateProjectPage />} />
// 					<Route path="/*" element={<NotFoundPage />} />
// 					<Route path="/users" element={<UsersPage />} />
// 					<Route path="/project/:id" element={<ProjectDetailPage />} />
// 					<Route path="/profile" element={<ProfilePage />} />
// 					<Route path="/subscription" element={<SubscriptionPage />} />
// 				</Routes>
// 				<Footer />
// 			</div>
// 		</>
// 	)
// }

// export default App
