import { useEffect, useState } from 'react';
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
	const { technologies } = useSelector((state) => state.technologies); 

	const [showModal, setShowModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);

	useEffect(() => {
		dispatch(getAllProjects({ pagination: 9999 }, token));
	}, [dispatch]);

	const handleEdit = (project) => {
		setSelectedProject(project);
		setShowModal(true);
	};

	const handleSave = async (formData, id) => {
		console.log('FormData to send:', Object.fromEntries(formData));
		dispatch(updateProjectById(formData, id , token));
		setShowModal(false);
		dispatch(getAllProjects({ pagination: 9999 }, token));
	};

	const handleDelete = async (projectId) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
			dispatch(deleteProjectById(projectId, token));
			dispatch(getAllProjects({ pagination: 9999 }, token));
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
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse"
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body accordion-body card my-2">
									<div className="d-flex justify-content-between">
										<div className="info">
											<p><strong>Description:</strong> {project.description}</p>
											<p><strong>Tags:</strong> {project.tags.map((tag) => tag.tagName).join(', ')}</p>
											<p><strong>Technologies:</strong> {project.technologies.map((tech) => tech.name).join(', ')}</p>
										</div>
										<div className="project-image">
											<img src={project.image} alt={project.title} style={{ maxWidth: '150px', maxHeight: '150px' }} />
										</div>
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
	.project-image {
		img {
			max-width: 150px;
			max-height: 150px;
			object-fit: cover;
		}
	}
`;
