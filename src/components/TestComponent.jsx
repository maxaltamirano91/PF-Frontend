import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTechnologies } from '../redux/actions'

const AddProjectForm = () => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	console.log(technologies)

	useEffect(() => {
		dispatch(fetchTechnologies(localStorage))
	}, [dispatch])

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		image: '',
		tags: [],
		technologies: [],
	})

	const [selectedTechs, setSelectedTechs] = useState([])
	const [isOtherTech, setIsOtherTech] = useState(false)

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleTechChange = (event) => {
		const { value } = event.target
		if (value === 'other') {
			setIsOtherTech(true)
		} else {
			setIsOtherTech(false)
			if (!selectedTechs.includes(value)) {
				setSelectedTechs([...selectedTechs, value])
			}
		}
	}

	const handleRemoveTech = (tech) => {
		setSelectedTechs(selectedTechs.filter((value) => value !== tech))
	}

	const handleTagChange = (event) => {
		const { value } = event.target
		const tagsArray = value
			.split(',')
			.map((tag) => tag.trim())
			.slice(0, 5)
		setFormData({
			...formData,
			tags: tagsArray,
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (!formData.title) {
			alert('El título es obligatorio')
			return
		}

		if (
			formData.description === '' ||
			formData.image === '' ||
			formData.tags.length === 0 ||
			selectedTechs.length === 0
		) {
			if (!window.confirm('Algunos campos están vacíos. ¿Desea continuar?')) {
				return
			}
		}

		const dataToSubmit = {
			...formData,
			technologies: selectedTechs,
		}
		console.log(dataToSubmit)

		try {
			const response = await axios.post(
				'http://localhost:3001/projects',
				dataToSubmit
			)
			console.log('Se agregó el proyecto:', response.data)
			window.alert(`${formData.title} agregado a la Base de Datos`)

			setFormData({
				title: '',
				description: '',
				image: '',
				tags: [],
				technologies: [],
			})
			setSelectedTechs([])
		} catch (error) {
			console.error('Error al agregar el proyecto:', error)
			window.alert(`error al agregar`)
		}
	}

	return (
		<FormStyled onSubmit={handleSubmit}>
			<div className="form-header">
				<span>Añadir proyecto</span>
			</div>

			<div className="form-body">
				<div className="form-field">
					<label>Nombre del Proyecto</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-field mt-2">
					<label>Descripción</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className="form-field mt-2">
					<label>Contenido multimedia</label>
					<input
						type="text"
						name="image"
						value={formData.image}
						onChange={handleChange}
						placeholder="URL de la imagen"
					/>
					{/* <input type="file" name="image" onChange={handleChange} /> */}
				</div>

				<div className="form-field mt-2">
					<label>Tecnologías</label>
					<select name="technologies" onChange={handleTechChange}>
						<option value="default">Seleccione una tecnología</option>
						{technologies.map((tech) => (
							<option key={tech.id} value={tech.name}>
								{tech.name}
							</option>
						))}
						<option value="other">Otra</option>
					</select>
					{isOtherTech && (
						<div className="newTech">
							<label>Nueva Tecnología</label>
							<input
								type="text"
								name="newTech"
								placeholder="Nueva Tecnología"
								value={formData.newTech}
								onChange={handleChange}
							/>
							<button
								type="button"
								onClick={() => {
									if (
										formData.newTech &&
										!technologies.includes(formData.newTech)
									) {
										setSelectedTechs([...selectedTechs, formData.newTech])
										setFormData({ ...formData, newTech: '' })
									}
								}}
							>
								Agregar Tecnología
							</button>
						</div>
					)}
					{selectedTechs.map((tech) => (
						<div key={tech} className="techList my-1">
							<span className="itemTech ">{tech}</span>
							<button
								className="btn btn-outline-danger remove mx-2"
								type="button"
								onClick={() => handleRemoveTech(tech)}
							>
								X
							</button>
						</div>
					))}
				</div>

				<div className="form-field mt-2">
					<label>Etiquetas</label>
					<input
						type="text"
						name="tags"
						value={formData.tags.join(', ')}
						onChange={handleTagChange}
						placeholder="Máximo 5 etiquetas separadas por comas"
					/>
				</div>
			</div>

			<div className="form-footer">
				<button className="submit" type="submit">
					Guardar
				</button>
			</div>
		</FormStyled>
	)
}

export default AddProjectForm

const FormStyled = styled.form`
	max-width: 350px;
	margin: auto;
	margin-top: 56px;
	border: 1px solid #0000004d;
	border-radius: 20px;
	button {
		border-radius: 12px;
	}

	.form-header {
		font-weight: 600;
		border-bottom: 1px solid #0000004d;
		padding: 12px;
	}

	.form-body {
		padding: 12px;
	}
	.form-field {
		display: flex;
		flex-direction: column;
	}
	.form-field-image {
		display: inline-flex;
		flex-direction: column;
		span {
			font-weight: 600;
		}
	}
	.form-footer {
		display: flex;
		justify-content: end;
		border-top: 1px solid #0000004d;
		padding: 12px;
	}
`
