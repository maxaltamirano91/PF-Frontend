import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

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
import UpdateUserPag from './view/update-user-page/UpdateUserPag'
import UsersPage from './view/users-page/UsersPage'
import CreateProjectPage from './view/create-project-page/CreateProjectPage'
import useAuth0TokenHandler from './hooks/useAuth0TokenHandler'
import ProjectDetailPage from './view/project-detail-page/ProjectDetailPage'
import AdminView from './view/admin-view/AdminView'
import SubscriptionPage from './view/subscription-page/subscriptionPage'
import PaymentSuccessPage from './view/payment-success-page/PaymentSuccessPage'
import PaymentFailurePage from './view/payment-failure-page/PaymentFailurePage'
import PaymentPendingPage from './view/payment-pending-page/PaymentPendingPage'
import DeletedProjectDetailPage from './view/deleted-project-detail-page/DeletedProjectDetailPage'
import ProFooter from './components/pro-footer/ProFooter'

import LandingPage from './view/landing-page/LandingPage'
import Dashboard from './view/dashboard-admin/dashboard'

function App() {
	const { isLoading } = useAuth0()

	useAuth0TokenHandler()

	if (isLoading) return <div>Loading...</div>

	return (
		<>
			<div className="App">
				<NavBarExtended />
				<div className="App-Container">
					<Routes>
						<Route path="/premium" element={<PremiumPage />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/explorer/users" element={<UsersPage />} />
						<Route path="/myprofile" element={<ProfilePage />} />
						<Route path="/users/:id" element={<ProfilePage />} />
						<Route path="/" element={<LandingPage />} />

						<Route path="/create" element={<CreateProjectPage />} />
						<Route path="/forgotPassword" element={<ForgotPasswordPage />} />

						<Route path="/dashboard" element={<AdminView />} />
						<Route path="/modUser" element={<UpdateUserPag />} />
						<Route path="/modProject/:id" element={<UpdateProjectPage />} />
						<Route path="/projects/:id" element={<ProjectDetailPage />} />
						<Route
							path="/myprofile/myfiledproj/:id"
							element={<DeletedProjectDetailPage />}
						/>
						<Route path="/premium" element={<PremiumPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/*" element={<NotFoundPage />} />
						<Route path="/subscription" element={<SubscriptionPage />} />
						<Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
						<Route path="/paymentFailure" element={<PaymentFailurePage />} />
						<Route path="/paymentPending" element={<PaymentPendingPage />} />
						<Route path="/escritorio" element={<Dashboard />} />
					</Routes>
				</div>
				{/* <ProFooter /> */}
				<Footer />
			</div>
		</>
	)
}

export default App
