import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllProjects,
	updateProjectById,
	deleteProjectById,
} from '../../redux/actions';
import EditProjectModal from './EditProjectModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AdminViewProjects = ({ searchQuery }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const projects = useSelector((state) => state.projects.allProjects);
	const { technologies } = useSelector((state) => state.technologies); // Obtén las tecnologías del estado

	const [showModal, setShowModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [renderingCards, setRenderingCards] = useState(15);
	const [displayPagination, setDisplayPagination] = useState(true);

	useEffect(() => {
		dispatch(getAllProjects({ pagination: renderingCards }));
	}, [dispatch, renderingCards]);

	const handleEdit = (project) => {
		setSelectedProject(project);
		setShowModal(true);
	};

	const handleSave = async (formData) => {
		console.log('FormData to send:', Object.fromEntries(formData));
		await dispatch(updateProjectById(formData, token));
		setShowModal(false);
		dispatch(getAllProjects({ pagination: renderingCards }));
	};

	const handleDelete = async (projectId) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
			await dispatch(deleteProjectById(projectId, token));
			dispatch(getAllProjects({ pagination: renderingCards }));
		}
	};

	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.tags.some((tag) =>
				tag.tagName.toLowerCase().includes(searchQuery.toLowerCase())
			) ||
			project.id.toString().includes(searchQuery) ||
			project.technologies.some((tech) =>
				tech.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
	);

	const handlePagination = () => {
		if (projects.length >= renderingCards) {
			setRenderingCards((prevCount) => prevCount + 15);
		} else {
			setDisplayPagination(false);
		}
	};

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
										<div className="tags">
											{project.tags
												.map((tag) => <span key={tag.id}>{tag.tagName}</span>)
												.reduce((prev, curr) => [prev, ', ', curr])}
										</div>
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
											onClick={() => handleEdit(project)}
										>
											Editar
										</button>
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
											onClick={() => handleDelete(project.id)}
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
			{displayPagination ? (
				<div>
					<button onClick={handlePagination}>Ver más</button>
				</div>
			) : (
				<p>No hay más proyectos</p>
			)}
			{selectedProject && (
				<EditProjectModal
					show={showModal}
					handleClose={() => setShowModal(false)}
					project={selectedProject}
					handleSave={handleSave}
					technologies={technologies} 
				/>
			)}
		</SectionStyled>
	);
};

export default AdminViewProjects;

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`;
