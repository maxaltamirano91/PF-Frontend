import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
	getProjectById,
	getUserProfile,
	deleteProject,
} from '../../redux/actions'

const ProjectDetailPage = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { project } = useSelector((state) => state.projects)
	const { token, loggedUser } = useSelector((state) => state.auth)
	const dispatch = useDispatch()

	const handleEdit = () => {
		navigate(`/modProject/${id}`)
	}

	useEffect(() => {
		console.log(id, { token })
		dispatch(getProjectById(id))
		dispatch(getUserProfile({ token }))
	}, [dispatch, id])

	const DeleteProject = () => {
		dispatch(deleteProject(id, { token }))
		alert('Proyecto eliminado exitosamente')
		navigate('/home')
	}

	if (!project) return null

	return (
		project && (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-8 mx-auto">
						<div className="card">
							<img
								src={project?.image}
								className="card-img-top"
								alt={project?.title}
							/>
							<div className="card-body">
								<h5 className="card-title">{project?.title}</h5>
								<p className="card-text">{project?.description}</p>
								{project?.tags && (
									<ul className="list-group list-group-flush">
										{project?.tags.map((tag, index) => (
											<li key={index} className="list-group-item">
												{tag}
											</li>
										))}
									</ul>
								)}
								{project?.technologies && (
									<ul>
										{project?.technologies.map((tech) => (
											<li key={tech.id}>{tech.name}</li>
										))}
									</ul>
								)}
								{loggedUser?.id !== undefined ? (
									loggedUser?.id === project?.userId ? (
										<div>
											<button
												className="btn btn-primary mt-3"
												onClick={handleEdit}
											>
												Edit Project
											</button>
											<button
												className="btn btn-custom border"
												onClick={DeleteProject}
												style={{ textDecoration: 'none', margin: '10px' }}
											>
												Eliminar
											</button>
										</div>
									) : null
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ProjectDetailPage
