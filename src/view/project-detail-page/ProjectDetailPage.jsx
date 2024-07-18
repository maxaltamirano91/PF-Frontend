import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProjectById, getUserProfile } from '../../redux/actions'

const ProjectDetailPage = () => {
	const { id } = useParams()
	const { project } = useSelector((state) => state.projects)
	const dispatch = useDispatch()
	const authToken = useSelector((state) => state.auth.token)
	

	useEffect(() => {
		dispatch(getProjectById(id))
	}, [dispatch, id])

	if (!project) return null

	return (
		project && (
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-8 mx-auto">
						<div className="card">
							<img
								src={project.image}
								className="card-img-top"
								alt={project.title}
							/>
							<div className="card-body">
								<h5 className="card-title">{project.title}</h5>
								<p className="card-text">{project.description}</p>
								{project.tags && (
									<ul className="list-group list-group-flush">
										{project.tags.map((tag, index) => (
											<li key={index} className="list-group-item">
												{tag}
											</li>
										))}
									</ul>
								)}
								{project.technologies && (
									<ul>
										{project.technologies.map((tech) => (
											<li key={tech.id}>{tech.name}</li>
										))}
									</ul>
								)}
							{/* {
								decodedtoken === 
							} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ProjectDetailPage
