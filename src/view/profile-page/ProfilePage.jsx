import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getUserProfile,
	cancelSubscription,
	getUserById,
	getDeletedProjects,
	restoreDeletedProject,
} from '../../redux/actions'
import { Link, useParams } from 'react-router-dom'
import Cards from '../../components/cards/Cards'
import Tabs from './components/Tabs'
import styles from './ProfilePage.module.css'
import { Pencil } from 'lucide-react'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [projects, setProjects] = useState([])
	const { token, loggedUser } = useSelector((state) => state.auth)
	const { deletedProjects } = useSelector((state) => state.projects)
	const { loading, error } = useSelector((state) => state.subscription)
	const { id } = useParams()
	const { user } = useSelector((state) => state.users)


	const handleUnsubscribe = () => {
		setShowModal(true)
	}

	const confirmUnsubscribe = () => {
		dispatch(cancelSubscription(token)).then(() => {
			dispatch(getUserProfile(token))
			setShowModal(false)
		})
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
		} else {
			dispatch(getUserById(id))
		}
	}, [dispatch, token, projects, id, loggedUser.id])

	if (!loggedUser) return <div>Loading ...</div>

	// const isOwner = !id  user
	const profileData = !id ? loggedUser : user

	const tabs = [
		{
			key: 'projects',
			label: 'Proyectos',
			content: (
				<div>
					<div className={styles.projectsHeader}>
						<h1>Proyectos:</h1>
						{loggedUser?.id === profileData?.id &&
							profileData?.planName !== 'Premium' &&
							profileData?.role !== 'admin' && (
								<Link to="/subscription">
									<button className={`btn ${styles['btn-dark-blue']}`}>
										Actualizar a PRO
									</button>
								</Link>
							)}
					</div>
					<div className={styles.cardsContainer}>
						<Cards projects={profileData === loggedUser ? loggedUser?.projects : user?.projects} />
					</div>
				</div>
			),
		},
	]

	if (loggedUser?.id === profileData?.id) {
		tabs.push({
			key: 'archived',
			label: 'Archivados',
			content: (
				<div>
					<h1>Proyectos Archivados:</h1>
					<div className={styles.cardsContainer}>
						<Cards projects={deletedProjects} onRestore={handleRestore} />
					</div>
				</div>
			),
		})
	}

	return (
		<div>
			<div className={styles.banner}>
				<h1 className={styles.title}>Bienvenido</h1>
			</div>
			<div className={styles.profileContainer}>
				<div className={styles.card}>
					<div className="m-3 text-center">
						<img
							className={styles.cardImg}
							src={profileData?.image}
							alt={profileData?.userName}
						/>
					</div>

					<div className={styles.cardBody}>
						<h2 className="card-title">{profileData?.userName}</h2>
						<p className="card-text">{profileData?.email}</p>
						<p className="card-text">{profileData?.bio}</p>
						<p className="card-text">{profileData?.role}</p>
						{!id && (
							<>
							<hr />
								<Link to="/create">
									<button className={styles.btnCustom}>Crear proyecto</button>
								</Link>
								<Link to="/modUser">
									<button className={styles.btnCustom}>
										<Pencil /> Editar perfil
									</button>
								</Link>
								{loggedUser?.planName === 'Premium' && (
									<>
										<button
											className={styles.btnCustom}
											onClick={handleUnsubscribe}
											disabled={loading}
										>
											{loading ? 'Procesando...' : 'Desuscribirse'}
										</button>
										<div
											className={`modal fade ${
												showModal ? 'show d-block' : ''
											}`}
											tabIndex="-1"
											role="dialog"
											aria-labelledby="exampleModalLabel"
											aria-hidden={!showModal}
										>
											<div className="modal-dialog" role="document">
												<div className="modal-content">
													<div className="modal-header">
														<h5 className="modal-title">
															Confirmar cancelación
														</h5>
														<button
															type="button"
															className="close"
															onClick={() => setShowModal(false)}
															aria-label="Close"
														>
															<span aria-hidden="true">&times;</span>
														</button>
													</div>
													<div className="modal-body">
														<p>
															¿Estás seguro de que deseas cancelar tu
															suscripción? Esta acción no se puede deshacer.
														</p>
													</div>
													<div className="modal-footer">
														<button
															type="button"
															className="btn btn-secondary"
															onClick={() => setShowModal(false)}
														>
															Cancelar
														</button>
														<button
															type="button"
															className="btn btn-primary"
															onClick={confirmUnsubscribe}
														>
															Confirmar
														</button>
													</div>
												</div>
											</div>
										</div>
									</>
								)}
							</>
						)}
						{error && <p className={styles.error}>{error}</p>}
					</div>
				</div>
				<div className={styles.profileContent}>
					<Tabs tabs={tabs} />
				</div>
			</div>
		</div>
	)
	
}

export default ProfilePage
