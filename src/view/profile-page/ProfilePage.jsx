import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../../components/tabs/Tabs'
import styles from './ProfilePage.module.css'
import Toastify from 'toastify-js'
import ModalForm from './components/ModalForm'
import ProfileData from '../../components/profile-data/ProfileData'
import {
	createReview,
	getUserProfile,
	cancelSubscription,
	getUserById,
	getDeletedProjects,
	restoreDeletedProject,
	contractForm,
	deleteReviewById,
} from '../../redux/actions'
import 'toastify-js/src/toastify.css'

const ProfilePage = () => {
	const categories = Object.freeze({
		contracts: 'contracts',
	})

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [activeTab, setActiveTab] = useState('projects')
	const [reload, setReload] = useState(false)
	const activeContractTab = categories.contracts

	const { token, loggedUser } = useSelector((state) => state.auth)
	const { deletedProjects } = useSelector((state) => state.projects)
	const { loading } = useSelector((state) => state.subscription)
	const { user } = useSelector((state) => state.users)
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const profileData = !id ? loggedUser : user

	const [formData, setFormData] = useState({
		senderId: '',
		receiverId: '',
		subject: '',
		projectDescription: '',
		budget: '',
		currency: 'ARS',
		availableTime: '',
		status: 'pending',
	})

	const handleUnsubscribe = () => {
		const confirm = window.confirm(
			'¿Estás seguro de que deseas cancelar tu suscripción? Esta acción no se puede deshacer.'
		)
		if (confirm) {
			dispatch(cancelSubscription(token)).then(() => {
				dispatch(getUserProfile(token))
			})
		}
	}

	const handleForm = () => {
		setFormData({
			...formData,
			senderId: loggedUser.id,
			receiverId: id,
		})
		setShowModal(true)
	}

	const handleContractFormSubmit = (form) => {
		dispatch(contractForm(form, token))
		setShowModal(false)
	}

	const handleReviewFormSubmit = (reviewData, handleCloseModal, id) => {
		if (id) {
			dispatch(
				createReview({ ...reviewData, reviewedUserId: id }, token, id)
			).then(() => {
				dispatch(getUserProfile(token))
				handleCloseModal()
				setReload((prev) => !prev)
				Toastify({
					text: 'Review publicado exitosamente',
					duration: 3000,
					close: true,
					gravity: 'top',
					position: 'center',
					backgroundColor: '#4CAF50',
					stopOnFocus: true,
				}).showToast()
			})
		}
	}

	const handleRestore = (projectId) => {
		dispatch(restoreDeletedProject(projectId, token)).then(() => {
			Toastify({
				text: 'Proyecto restaurado',
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'center',
				backgroundColor: '#4CAF50',
				stopOnFocus: true,
			}).showToast()
			dispatch(getDeletedProjects(token))
			dispatch(getUserProfile(token))
			setReload((prev) => !prev)
		})
	}

	const handleDelete = (id) => {
		const confirm = window.confirm('¿Deseas eliminar la review?')
		if (confirm) {
			dispatch(deleteReviewById(id, token)).then(() => {
				setReload((prev) => !prev)
				Toastify({
					text: 'Review eliminada correctamente',
					duration: 3000,
					close: true,
					gravity: 'top',
					position: 'center',
					backgroundColor: '#4CAF50',
					stopOnFocus: true,
				}).showToast()
			})
		}
	}

	const handleTabClick = (category) => {
		setActiveTab(category)
		setSearchQuery('')
		const newUrl = `${location.pathname}?tab=${category}`
		navigate(newUrl)
	}

	useEffect(() => {
		const query = new URLSearchParams(location.search)
		const tab = query.get('tab')
		if (tab) {
			setActiveTab(tab)
		}
	}, [location])

	useEffect(() => {
		if (loggedUser?.id === id || !id) {
			dispatch(getUserProfile(token))
			dispatch(getDeletedProjects(token))
		} else {
			dispatch(getUserById(id))
		}
	}, [dispatch, token, id, loggedUser?.id, reload])

	if (!loggedUser) return <div>Loading ...</div>

	return (
		<div className={styles.container}>
			<div className={styles.profileContainer}>
				<div className={`${styles.banner} z-index-0`}></div>
				{profileData ? (
					<>
						<ProfileData
							profileData={profileData}
							handleUnsubscribe={handleUnsubscribe}
							loading={loading}
							isCurrentUser={!id}
							handleForm={handleForm}
						/>
						<Tabs
							profileData={profileData}
							activeContractTab={activeContractTab}
							searchQuery={searchQuery}
							handleReviewFormSubmit={handleReviewFormSubmit}
							onRestore={handleRestore}
							deletedProjects={deletedProjects}
							onClick={handleTabClick}
							activeTab={activeTab}
							handleDelete={handleDelete}
						/>
					</>
				) : (
					<div>Loading profile data...</div>
				)}
			</div>
			<ModalForm
				show={showModal}
				handleClose={() => setShowModal(false)}
				contract={formData}
				handleSend={handleContractFormSubmit}
			/>
		</div>
	)
}

export default ProfilePage
