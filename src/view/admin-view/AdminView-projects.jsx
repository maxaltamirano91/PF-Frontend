import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewProjects = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const projects = useSelector((state) => state.projects.allProjects)
	console.log(projects)

	const [displayPagination, setDisplayPagination] = useState(true)
	const [renderingCards, setRenderingCards] = useState(15)

	useEffect(() => {
		dispatch(getAllProjects(renderingCards))
	}, [dispatch, token, renderingCards])

	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase())
			) ||
			project.id.toString().includes(searchQuery) ||
			project.technologies.some((tech) =>
				tech.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
	)

	const handlePagination = () => {
		if (projects.length >= renderingCards) {
			setRenderingCards((prevCount) => prevCount + 15)
		} else {
			setDisplayPagination(false)
		}
	}

	return (
		<SectionStyled className="ListProjects">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				{filteredProjects && filteredProjects.length > 0 ? (
					filteredProjects.map((project, index) => (
						<div className="accordion-item" key={project.id}>
							<h2 className="accordion-header">
								<span
									className="accordion-button collapsed item"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#flush-collapse${index}`}
									aria-expanded="false"
									aria-controls={`flush-collapse${index}`}
								>
									<div className="d-flex justify-content-between w-100 pe-5 flex-wrap">
										<div className="title">{project.title}</div>
										<div className="tags">{project.tags.join(', ')}</div>
										<div className="id">{project.id}</div>
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse"
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body accordion-body card my-2">
									<div className="info">
										<p>Description: {project.description}</p>
										<p>
											Technologies:{' '}
											{project.technologies.map((tech) => tech.name).join(', ')}
										</p>
										<p>ID: {project.id}</p>
									</div>
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										<button
											type="button"
											className="btn btn-outline-primary mb-0"
										>
											Editar
										</button>
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
										>
											Eliminar
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay proyectos disponibles</p>
				)}
			</div>
			{displayPagination && (
				<button className="btn btn-secondary" onClick={handlePagination}>
					Cargar más
				</button>
			)}
		</SectionStyled>
	)
}

export default AdminViewProjects

// ? Styles

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
