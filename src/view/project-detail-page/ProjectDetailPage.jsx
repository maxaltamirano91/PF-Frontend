import styles from './ProjectDetailPage.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { Button } from 'react-bootstrap'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import {
	getProjectById,
	getUserProfile,
	deleteProject,
	toggleProjectLike,
} from '../../redux/actions'
import UpdateProjectPage from '../update-project-page/UpdateProjectPage'

const ProjectDetailPage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { project } = useSelector((state) => state.projects)
	const { token, loggedUser } = useSelector((state) => state.auth)
	const { theme } = useSelector((state) => state.themes)
	const [showEditModal, setShowEditModal] = useState(false)

	useEffect(() => {
		dispatch(getProjectById(id))
		dispatch(getUserProfile(token))
	}, [dispatch, id, token])

	const handleEdit = () => setShowEditModal(true)
	const handleClose = () => {
		setShowEditModal(false)
	}

	const archiveProject = () => {
		const confirm = window.confirm(
			'¿Estás seguro que deseas archivar el proyecto?'
		)
		if (confirm) {
			dispatch(deleteProject(id, token))
			Toastify({
				text: 'Proyecto archivado',
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'center',
				backgroundColor: '#4CAF50',
				stopOnFocus: true,
			}).showToast()
			navigate('/myprofile')
		}
	}

	const toggleLike = (project) => {
		if (loggedUser && project) {
			dispatch(
				toggleProjectLike(
					{ projectId: project.id, userId: loggedUser.id },
					project.id,
					token
				)
			)
		}
	}

	if (!project) return null

	return (
		<div className={`styles.container`}>
			<section className={styles.card}>
				<div className={styles.cardImageContainer}>
					<img
						className={styles.cardImage}
						src={project?.image}
						alt={project?.title}
					/>
				</div>
				<div className={styles.cardDetail}>
					<div className={styles.userProfile}>
						<img src={project?.user?.image} alt={project?.id} />
						<span>{project.user.userName}</span>
					</div>
					<h2 className={styles.cardDetailTitle}>{project?.title}</h2>
					<p className={styles.cardDetailDesc}>{project?.description}</p>

					{project?.tags && (
						<div className={styles.tagsContainer}>
							{project?.tags.map((tag) => (
								<span key={tag.id} className={styles.tagText}>
									#{tag.tagName}
								</span>
							))}
						</div>
					)}

					<hr className={styles.divider} />

					{project?.technologies && (
						<div className={styles.technologiesContainer}>
							{project?.technologies.map((tech) => (
								<span key={tech.id} className={styles.techButton}>
									{tech.name}
								</span>
							))}
						</div>
					)}

					<div
						onClick={() => toggleLike(project)}
						className={`${styles.likeButton} mt-4`}
					>
						<span>{project.likes.length}</span>
						<ThumbsUp
							className={theme === 'light' ? 'text-dark' : 'text-light'}
							fill={
								project.likes.some((like) => like?.userId === loggedUser?.id)
									? theme === 'light'
										? '#343a40'
										: '#f8f9fa'
									: 'none'
							}
							size={20}
						/>
					</div>
					{loggedUser?.id !== undefined &&
						loggedUser?.id === project?.userId && (
							<div className={styles.buttonsContainer}>
								<Button variant="primary" onClick={handleEdit}>
									Modificar
								</Button>
								<Button variant="secondary" onClick={archiveProject}>
									Archivar
								</Button>

								{showEditModal && (
									<div className={styles.modalOverlay} onClick={handleClose}>
										<div
											className={styles.modalContent}
											onClick={(e) => e.stopPropagation()}
										>
											<UpdateProjectPage />
										</div>
									</div>
								)}
							</div>
						)}
				</div>
			</section>
		</div>
	)
}

export default ProjectDetailPage
