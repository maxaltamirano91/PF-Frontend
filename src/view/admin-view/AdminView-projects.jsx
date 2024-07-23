import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewProjects = () => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const projects = useSelector((state) => state.projects.allProjects)

	const [displayPagination, setDisplayPagination] = useState(true)
	const [renderingCards, setRenderingCards] = useState(15)

	const handlePagination = () => {
		if (projects.length >= renderingCards) {
			setRenderingCards((prevCount) => prevCount + 15)
		} else {
			setDisplayPagination(false)
		}
	}

	useEffect(() => {
		dispatch(getAllProjects(renderingCards))
	}, [dispatch, token, renderingCards])

	const [collapsedRows, setCollapsedRows] = useState({})

	const toggleCollapse = (projectId) => {
		setCollapsedRows((prev) => ({
			...prev,
			[projectId]: !prev[projectId],
		}))
	}

	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">Title</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{projects && projects.length > 0 ? (
						projects.map((project) => (
							<>
								<tr key={project.id}>
									<th scope="row" className="align-middle">
										{project.id}
									</th>
									<td className="align-middle">{project.title}</td>
									<td className="align-middle">
										<span
											className="btn btn-primary btn-sm mx-2"
											onClick={() => toggleCollapse(project.id)}
											data-bs-toggle="collapse"
											data-bs-target={`#collapseExample${project.id}`}
											aria-expanded="false"
											aria-controls={`collapseExample${project.id}`}
										>
											Ver mas
										</span>
										<span className="btn btn-danger btn-sm">Eliminar</span>
									</td>
								</tr>
								<tr
									className={`collapse ${
										collapsedRows[project.id] ? 'show' : ''
									}`}
									id={`collapseExample${project.id}`}
								>
									<td colSpan="3">
										<div className="card card-body">
											<p>Description: {project.description}</p>
										</div>
									</td>
								</tr>
							</>
						))
					) : (
						<tr>
							<td className="align-middle" colSpan="3">
								No hay proyectos disponibles
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{displayPagination && (
				<button className="btn btn-secondary" onClick={handlePagination}>
					Cargar más
				</button>
			)}
		</div>
	)
}

export default AdminViewProjects

// ---------------------------------------------------------
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProjects } from '../../redux/actions'

// const AdminViewProjects = () => {
// 	const dispatch = useDispatch()
// 	const token = useSelector((state) => state.auth.token)
// 	const projects = useSelector((state) => state.projects.allProjects)

// 	const [displayPagination, setDisplayPagination] = useState(true)

// 	const [renderingCards, setRenderingCards] = useState(15)
// 	const handlePagination = () => {
// 		if (projects.length >= renderingCards) {
// 			setRenderingCards((prevCount) => prevCount + 15)
// 		} else {
// 			setDisplayPagination(false)
// 		}
// 	}

// 	useEffect(() => {
// 		dispatch(getAllProjects(renderingCards))
// 	}, [dispatch, token, renderingCards])

// 	console.log(projects)

// 	return (
// 		<div>
// 			<span>aqui va la tabla</span>
// 		</div>
// 	)
// }
// export default AdminViewProjects
