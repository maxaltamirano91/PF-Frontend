import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const ModalForm = ({ show, handleClose, contract, handleSend }) => {
	const [formData, setFormData] = useState({ ...contract })

	useEffect(() => {
		setFormData({ ...contract })
	}, [contract])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleSend(formData)
		Toastify({
			text: 'Mensaje enviado',
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'center',
			backgroundColor: '#4CAF50',
			stopOnFocus: true,
		}).showToast()
		handleClose()
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Formulario de contratación</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formSubject">
						<Form.Label>Proyecto</Form.Label>
						<Form.Control
							type="text"
							name="subject"
							value={formData.subject}
							onChange={handleChange}
							style={{ marginRight: '10px' }}
						/>
					</Form.Group>
					<Form.Group controlId="formDescription">
						<Form.Label>Descripción proyecto</Form.Label>
						<Form.Control
							as="textarea"
							name="projectDescription"
							value={formData.projectDescription}
							onChange={handleChange}
							rows={4}
						/>
					</Form.Group>
					<Form.Group controlId="formBudget">
						<Form.Label>Tu presupuesto</Form.Label>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Form.Control
								type="text"
								name="budget"
								value={formData.budget}
								onChange={handleChange}
								style={{ marginRight: '10px' }}
							/>
							<Form.Control
								as="select"
								name="currency"
								value={formData.currency}
								onChange={handleChange}
							>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="ARS">ARS</option>
							</Form.Control>
						</div>
					</Form.Group>
					<Form.Group controlId="formAvailableTime">
						<Form.Label>Tu cronología</Form.Label>
						<Form.Control
							as="select"
							name="availableTime"
							value={formData.availableTime}
							onChange={handleChange}
						>
							<option value="" disabled selected>
								Seleccione una opción
							</option>
							<option value="Ahora">Ahora</option>
							<option value="En un plazo de varias semanas">
								En un plazo de varias semanas
							</option>
							<option value="En un mes">En un mes</option>
							<option value="Más de un mes">Más de un mes</option>
						</Form.Control>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={handleSubmit}>
					Enviar mensaje
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalForm
