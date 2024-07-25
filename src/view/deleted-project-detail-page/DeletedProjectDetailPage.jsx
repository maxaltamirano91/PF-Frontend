import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	getDeletedProjectById,
    getUserProfile,
    restoreDeletedProject
} from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import styles from './DeletedProjectDetailPage.module.css'

const ProjectDetailPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { project } = useSelector((state) => state.projects)
	const { token, loggedUser } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const [show, setShow] = useState(false)

	useEffect(() => {
		dispatch(getDeletedProjectById(id))
		dispatch(getUserProfile(token))
    }, [dispatch, id, token])
    
	const handleShow = () => {
		setShow(true)
	}

	const handleClose = () => setShow(false)

	const restoreProject = () => {
		dispatch(restoreDeletedProject(id, token))
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

	return (
		<div className="container mt-5">
			<section className={styles.card}>
				<div className={styles.cardImageContainer}>
					<img
						className={styles.cardImage}
						src={project?.image}
						alt={project?.title}
					/>
				</div>
				<div className={styles.cardDetail}>
					<p className={styles.cardDetailCaption}>PROJECT</p>
					<h1 className={styles.cardDetailTitle}>{project?.title}</h1>
					<p className={styles.cardDetailDesc}>{project?.description}</p>

					{project?.tags && (
						<div className={styles.tagsContainer}>
							{project?.tags.map((tag) => (
								<button
									key={tag.id}
									className={`btn ${styles.tagButton}`}
									disabled
								>
									{tag.tagName}
								</button>
							))}
						</div>
					)}

					<hr className={styles.divider} />

					{project?.technologies && (
						<div className={styles.technologiesContainer}>
							{project?.technologies.map((tech) => (
								<button
									key={tech.id}
									className={`btn ${styles.techButton}`}
									disabled
								>
									{tech.name}
								</button>
							))}
						</div>
					)}

					{loggedUser?.id !== undefined &&
						loggedUser?.id === project?.userId && (
							<div className={styles.buttonsContainer}>
								<button
								className={`btn ${styles.deleteButton}`}
								onClick={handleShow}
								style={{ textDecoration: 'none', margin: '10px' }}
							>
								Restaurar
							</button>
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Confirmación</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										¿Deseas restaurar el proyecto?
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Cancelar
										</Button>
										<Button variant="danger" onClick={restoreProject}>
											Aceptar
										</Button>
									</Modal.Footer>
								</Modal>							
							</div>
						)}
				</div>
			</section>
		</div>
	)
}

export default ProjectDetailPage