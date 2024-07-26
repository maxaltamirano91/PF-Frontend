import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const EditProjectModal = ({ show, handleClose, project, handleSave }) => {
	const [title, setTitle] = useState(project.title)
	const [description, setDescription] = useState(project.description)
	const [tags, setTags] = useState(project.tags.join(', '))
	const [technologies, setTechnologies] = useState(
		project.technologies.map((tech) => tech.name).join(', ')
	)
	const [image, setImage] = useState(project.image)

	const handleSubmit = () => {
		const updatedProject = {
			...project,
			title,
			description,
			tags: tags.split(',').map((tag) => tag.trim()),
			technologies: technologies.split(',').map((tech) => ({ name: tech.trim() })),
			image,
		}
		handleSave(updatedProject)
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Editar Proyecto</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formTitle">
						<Form.Label>Título</Form.Label>
						<Form.Control
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formDescription">
						<Form.Label>Descripción</Form.Label>
						<Form.Control
							as="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formTags">
						<Form.Label>Tags</Form.Label>
						<Form.Control
							type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formTechnologies">
						<Form.Label>Tecnologías</Form.Label>
						<Form.Control
							type="text"
							value={technologies}
							onChange={(e) => setTechnologies(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formImage">
						<Form.Label>Imagen</Form.Label>
						<Form.Control
							type="text"
							value={image}
							onChange={(e) => setImage(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Guardar cambios
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default EditProjectModal
