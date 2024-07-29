import styles from './ProfilePage.module.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import 'toastify-js/src/toastify.css'

import Toastify from 'toastify-js'
import Tabs from '../../components/tabs/Tabs'
import ProfileData from '../../components/profile-data/ProfileData'
import {
	getUserProfile,
	cancelSubscription,
	getUserById,
	getDeletedProjects,
	restoreDeletedProject,
} from '../../redux/actions'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const [projects, setProjects] = useState([])
	const { token, loggedUser } = useSelector((state) => state.auth)
	const { deletedProjects } = useSelector((state) => state.projects)
	const { loading } = useSelector((state) => state.subscription)
	const { id } = useParams()
	const { user } = useSelector((state) => state.users)
	const profileData = !id ? loggedUser : user

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
			<div className={styles.banner}>
				<div className={styles.profileContainer}>
					{profileData ? (
						<>
							<ProfileData
								profileData={profileData}
								handleUnsubscribe={handleUnsubscribe}
								loading={loading}
								isCurrentUser={!id}
							/>
							<Tabs
								profileData={profileData}
								onRestore={handleRestore}
								deletedProjects={deletedProjects}
							/>
						</>
					) : (
						<div>Loading profile data...</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
