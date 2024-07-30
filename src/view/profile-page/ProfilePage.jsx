import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Tabs from '../../components/tabs/Tabs'
import styles from './ProfilePage.module.css'
import Toastify from 'toastify-js'
import ModalForm from './components/ModalForm'
import ProfileData from '../../components/profile-data/ProfileData'
import {
	getUserProfile,
	cancelSubscription,
	getUserById,
	getDeletedProjects,
	restoreDeletedProject,
	contractForm,
} from '../../redux/actions'
import 'toastify-js/src/toastify.css'

const ProfilePage = () => {
	const categories = Object.freeze({
		contracts: 'contracts',
	})
	const dispatch = useDispatch()
	const [projects, setProjects] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [activeContractTab, setActiveContractTab] = useState(categories.contracts)
	const { token, loggedUser } = useSelector((state) => state.auth)
	const { deletedProjects } = useSelector((state) => state.projects)
	const { loading } = useSelector((state) => state.subscription)
	const { user } = useSelector((state) => state.users)
	const { id } = useParams()
	
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
			dispatch(getUserProfile(token))
			setProjects(loggedUser.projects)
		})
	}

	const handleTabClick = (category) => {
		setActiveContractTab(category)
		setSearchQuery('')
	}

	useEffect(() => {
		if (loggedUser?.id === id || !id) {
			dispatch(getUserProfile(token))
			dispatch(getDeletedProjects(token))
			setProjects(loggedUser.projects)
		} else dispatch(getUserById(id))
	}, [dispatch, token, projects, id, loggedUser.id])

	if (!loggedUser) return <div>Loading ...</div>


	return (
		<div className={styles.container}>
			<div className={`${styles.banner} z-index-0`}></div>
			<div className={styles.profileContainer}>
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
							onRestore={handleRestore}
							deletedProjects={deletedProjects}
							onClick={handleTabClick}
							searchQuery={searchQuery}
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
