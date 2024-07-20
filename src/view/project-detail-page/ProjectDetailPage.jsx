import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions'

const ProjectDetailPage = () => {

	const navigate = useNavigate()
	const { id } = useParams()
	const { project } = useSelector((state) => state.projects)
	const dispatch = useDispatch()
	const authToken = useSelector((state) => state.auth.token)
	const lal = useSelector((state)=>state.auth.loggedUser)

	const handleEdit = () => {
		navigate(`/modProject/${id}`);
	  };
	
	useEffect(() => {
		dispatch(getProjectById(id))
		dispatch(getUserProfile(authToken))
	}, [dispatch, id])

	const DeleteProject = () => {
		console.log(id, authToken)
		dispatch(deleteProject(id, authToken))
		alert("Proyecto eliminado exitosamente")
		navigate("/home")
	}

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
							{
								lal.id !== undefined ?
								lal.id === project.userId ?
								<div>
									<button 
                					className="btn btn-primary mt-3"
                					onClick={handleEdit}
              						>
                					Edit Project
              						</button>
									<button className="btn btn-custom border" onClick={DeleteProject} style={{textDecoration:"none", margin:"10px"}}>
										Eliminar
									</button>
								</div> : null : null
							}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ProjectDetailPage
