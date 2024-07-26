import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getUserProfile,
	cancelSubscription,
	getDeletedProjects,
	restoreDeletedProject,
} from '../../redux/actions'
import { Link } from 'react-router-dom'
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
	const { loading, error } = useSelector((state) => state.subscription)
	const { deletedProjects } = useSelector((state) => state.projects)

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
		dispatch(getUserProfile(token))
		dispatch(getDeletedProjects(token))
		setProjects(loggedUser.projects)
	}, [dispatch, token, projects])

	if (!loggedUser) return <div>Loading ...</div>

	const tabs = [
		{
			key: 'projects',
			label: 'Proyectos',
			content: (
				<div>
					<div className={styles.projectsHeader}>
						<h1>Proyectos:</h1>
						{loggedUser.planName !== 'Premium' && (
							<Link to="/subscription">
								<button className={`btn ${styles['btn-dark-blue']}`}>
									Actualizar a PRO
								</button>
							</Link>
						)}
					</div>
					<div className={styles.cardsContainer}>
						<Cards projects={loggedUser.projects} />
					</div>
				</div>
			),
		},
		{
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
		},
	]

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
							src={loggedUser.image}
							alt={loggedUser.userName}
						/>
					</div>

					<div className={styles.cardBody}>
						<h2 className="card-title">{loggedUser.userName}</h2>
						<p className="card-text">{loggedUser.email}</p>
						<p className="card-text">{loggedUser.bio}</p>
						<p className="card-text">{loggedUser.role}</p>
						<hr />
						<Link to="/create">
							<button className={styles.btnCustom}>Crear proyecto</button>
						</Link>
						<Link to="/modUser">
							<button className={styles.btnCustom}>
								<Pencil /> Editar perfil
							</button>
						</Link>
						{loggedUser.planName === 'Premium' && (
							<>
								<button
									className={styles.btnCustom}
									onClick={handleUnsubscribe}
									disabled={loading}
								>
									{loading ? 'Procesando...' : 'Desuscribirse'}
								</button>
								<div
									className={`modal fade ${showModal ? 'show d-block' : ''}`}
									tabIndex="-1"
									role="dialog"
									aria-labelledby="exampleModalLabel"
									aria-hidden={!showModal}
								>
									<div className="modal-dialog" role="document">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title">Confirmar cancelación</h5>
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
													¿Estás seguro de que deseas cancelar tu suscripción?
													Esta acción no se puede deshacer.
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
