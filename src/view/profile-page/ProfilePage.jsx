import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	getUserProfile,
	cancelSubscription,
	getUserById,
	getDeletedProjects,
	restoreDeletedProject,
	contractForm,
} from '../../redux/actions'
import ContractView from './components/ContractView'
import { Link, useParams } from 'react-router-dom'
import Cards from '../../components/cards/Cards'
import Tabs from './components/Tabs'
import styles from './ProfilePage.module.css'
import styled from 'styled-components'
import { Pencil, Briefcase } from 'lucide-react'
import Toastify from 'toastify-js'
import ModalForm from './components/ModalForm'
import 'toastify-js/src/toastify.css'

const ProfilePage = () => {
	const categories = Object.freeze({
		contracts: 'contracts',
	})
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [projects, setProjects] = useState([])
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
	const [activeTab, setActiveTab] = useState(categories.contracts)
	const [searchQuery, setSearchQuery] = useState('')
	const { token, loggedUser } = useSelector((state) => state.auth)
	const { deletedProjects } = useSelector((state) => state.projects)
	const { loading, error } = useSelector((state) => state.subscription)
	const { id } = useParams()
	const { user } = useSelector((state) => state.users)

	const profileData = !id ? loggedUser : user

	const handleUnsubscribe = () => {
		setShowModal(true)
	}

	const confirmUnsubscribe = () => {
		dispatch(cancelSubscription(token)).then(() => {
			dispatch(getUserProfile(token))
			setShowModal(false)
		})
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
		setActiveTab(category)
		setSearchQuery('')
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
						<Cards
							projects={
								profileData === loggedUser
									? loggedUser?.projects
									: user?.projects
							}
						/>
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

	if (loggedUser?.id === profileData?.id) {
		tabs.push({
			key: 'contracts',
			label: 'Contratos',
			content: (
				<div>
					<h1>Solicitudes de trabajo:</h1>
					<SectionStyled className="container-fluid mt-2" id="dashboard" />
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a
								className={`nav-link ${
									activeTab === categories.contracts ? 'active' : ''
								}`}
								aria-current={activeTab === 'contracts' ? 'page' : undefined}
								onClick={() => handleTabClick(categories.contracts)}
							>
								Solicita usuario
							</a>
						</li>
					</ul>
					<div className="content-tab" id="content-tab">
						{activeTab === categories.contracts && (
							<ContractView searchQuery={searchQuery} />
						)}
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
						<p className="card-text">{profileData?.aboutMe}</p>
						{id && (
							<button
								type="button"
								className={styles.btnCustom}
								onClick={() => handleForm(formData)}
							>
								<Briefcase /> Contratar
							</button>
						)}
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

const SectionStyled = styled.section`
	a.nav-link {
		cursor: pointer;

		&.active {
			font-weight: 700;
		}
		&:hover {
			/* background: none; */
		}
	}
`
