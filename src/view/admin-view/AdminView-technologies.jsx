import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const AdminViewTechnologies = ({ searchQuery }) => {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const techs = useSelector((state) => state.technologies.technologies)

	useEffect(() => {
		dispatch(fetchTechnologies(token))
	}, [dispatch, token])

	const filteredTechnologies = techs.filter(
		(tech) =>
			tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			tech.id.toString().includes(searchQuery)
	)

	return (
		<SectionStyled className="ListTechnologies">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<span
							className="accordion-button collapsed "
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#flush-collapseOne"
							aria-expanded="false"
							aria-controls="flush-collapseOne"
						>
							<span>+ Agregar Nueva Tech </span>
						</span>
					</h2>
					<div
						id="flush-collapseOne"
						className="accordion-collapse collapse"
						data-bs-parent="#accordionFlushExample"
					>
						<div className="card-body accordion-body card my-2">
							<div className="form-floating mb-3">
								<input
									type="email"
									className="form-control"
									id="floatingInput"
									placeholder="name@example.com"
								/>
								<label htmlFor="floatingInput">Nombre de la tecnología </label>
							</div>
							<hr />
							<div className="actions d-flex justify-content-end gap-2">
								<button type="button" className="btn btn-outline-success mb-0">
									Crear Tech
								</button>
							</div>
						</div>
					</div>
				</div>

				{filteredTechnologies && filteredTechnologies.length > 0 ? (
					filteredTechnologies.map((tech, index) => (
						<div className="accordion-item" key={tech.id}>
							<h2 className="accordion-header">
								<span
									className="accordion-button collapsed item"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#flush-collapse${index}`}
									aria-expanded="false"
									aria-controls={`flush-collapse${index}`}
								>
									<div className="d-flex justify-content-between w-100 pe-5 flex-wrap alinear">
										<div className="name">{tech.name}</div>
										<div className="id">{tech.id}</div>
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
										<p>Name: {tech.name}</p>
										<p>ID: {tech.id}</p>
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
					<p>No hay tecnologías disponibles</p>
				)}
			</div>
		</SectionStyled>
	)
}

export default AdminViewTechnologies

// ? Styles

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`
