import axios from 'axios'
import styled from 'styled-components'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTechs, addProject } from '../redux/actions'

const AddProjectForm = () => {
	const dispatch = useDispatch()
	const allTechs = useSelector((state) => state.techs.techs)
	const [selectedTechs, setSelectedTechs] = useState([])
	const [isOtherTech, setIsOtherTech] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		image: '',
		tags: '',
		technologies: [],
		newTech: '',
	})

	useEffect(() => {
		dispatch(getAllTechs())
	}, [dispatch])

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSelectTech = (event) => {
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

	const handleSubmit = (event) => {
		event.preventDefault()
		const dataToSubmit = {
			...formData,
			technologies: selectedTechs,
		}

		if (isOtherTech && formData.newTech) {
			dataToSubmit.technologies.push(formData.newTech)
		}

		dispatch(addProject(dataToSubmit))
	}

	return (
		<FormStyled onSubmit={handleSubmit}>
			<div>
				<h2>Agregar Nuevo Proyecto</h2>
			</div>
			<div>
				<label>Título</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Descripción</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Imagen</label>
				<input
					type="text"
					name="image"
					value={formData.image}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Etiquetas</label>
				<input
					type="text"
					name="tags"
					value={formData.tags}
					onChange={handleChange}
				/>
			</div>
			<div className="tipos">
				<label>Tecnologías</label>
				<select onChange={handleSelectTech}>
					<option value="">Seleccionar...</option>
					{allTechs.map((tech) => (
						<option key={tech.id} value={tech.name}>
							{tech.name}
						</option>
					))}
					<option value="other">Otra...</option>
				</select>
				{isOtherTech && (
					<div className="newType">
						<label>Nueva Tecnología</label>
						<input
							type="text"
							name="newTech"
							placeholder="Nueva tecnología"
							value={formData.newTech}
							onChange={handleChange}
						/>
						<button
							type="button"
							onClick={() => {
								if (formData.newTech && !allTechs.includes(formData.newTech)) {
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
					<div key={tech}>
						<span className="itemType">{tech}</span>
						<button
							className="remove"
							type="button"
							onClick={() => handleRemoveTech(tech)}
						>
							❌
						</button>
					</div>
				))}
			</div>
			<button className="submit" type="submit">
				Agregar Proyecto
			</button>
		</FormStyled>
	)
}

export default AddProjectForm

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 600px;
	margin: auto;
	margin-top: 56px;
	border: 1px solid #fafafa48;
	background-color: #b0b5ff;
	border-radius: 20px;
	text-align: left;
	div h2 {
		text-align: center;
	}

	div {
		width: 360px;
	}
	label {
		display: block;
		margin-top: 24px;
	}
	input {
		display: inline-flex;
		background-color: transparent;
		padding: 5px;
		width: 70%;
		border: none;
		outline: none;
		border-bottom: 2px solid #fafafa48;
		&:focus {
			border-bottom-color: black;
		}
	}
	textarea {
		display: inline-flex;
		background-color: transparent;
		padding: 5px;
		width: 70%;
		border: none;
		outline: none;
		border-bottom: 2px solid #fafafa48;
		&:focus {
			border-bottom-color: black;
		}
	}
	.tipos {
		display: flex;
		flex-direction: column;
		text-align: left;
		label {
			padding-bottom: 12px;
		}
		select {
			height: 2em;
			margin-bottom: 1em;
		}
	}
	.newType {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 24px;
	}
	.remove {
		padding: 0;
		border-radius: 50%;
		margin-left: 12px;
		background-color: transparent;
		border: none;
		transition: transform 0.3s ease;
		&:hover {
			transform: scale(1.1);
			border: 1px solid #fafafa48;
		}
	}
	.submit {
		margin: 24px 0;
	}
	.itemType {
		padding: 24px 0;
		margin: 24px 0;
	}
	.error {
		border: 1px solid #ff0000a9;
	}
`

// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllTechs, addProject } from '../redux/actions'

// const AddProjectForm = () => {
// 	const dispatch = useDispatch()
// 	const allTechs = useSelector((state) => state.techs.techs)
// 	const [selectedTechs, setSelectedTechs] = useState([])
// 	const [isOtherTech, setIsOtherTech] = useState(false)
// 	const [formData, setFormData] = useState({
// 		title: '',
// 		description: '',
// 		image: '',
// 		tags: '',
// 		technologies: [],
// 		newTech: '',
// 	})

// 	useEffect(() => {
// 		dispatch(getAllTechs())
// 	}, [dispatch])

// 	const handleChange = (event) => {
// 		const { name, value } = event.target
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		})
// 	}

// 	const handleSelectTech = (event) => {
// 		const { value } = event.target
// 		if (value === 'other') {
// 			setIsOtherTech(true)
// 		} else {
// 			setIsOtherTech(false)
// 			if (!selectedTechs.includes(value)) {
// 				setSelectedTechs([...selectedTechs, value])
// 			}
// 		}
// 	}

// 	const handleRemoveTech = (tech) => {
// 		setSelectedTechs(selectedTechs.filter((value) => value !== tech))
// 	}

// 	const handleSubmit = (event) => {
// 		event.preventDefault()
// 		const dataToSubmit = {
// 			...formData,
// 			technologies: selectedTechs,
// 		}

// 		if (isOtherTech && formData.newTech) {
// 			dataToSubmit.technologies.push(formData.newTech)
// 		}

// 		dispatch(addProject(dataToSubmit))
// 	}

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<div>
// 				<h2>Agregar Nuevo Proyecto</h2>
// 			</div>
// 			<div>
// 				<label>Título</label>
// 				<input
// 					type="text"
// 					name="title"
// 					value={formData.title}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 			<div>
// 				<label>Descripción</label>
// 				<textarea
// 					name="description"
// 					value={formData.description}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 			<div>
// 				<label>Imagen</label>
// 				<input
// 					type="text"
// 					name="image"
// 					value={formData.image}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 			<div>
// 				<label>Etiquetas</label>
// 				<input
// 					type="text"
// 					name="tags"
// 					value={formData.tags}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 			<div>
// 				<label>Tecnologías</label>
// 				<select onChange={handleSelectTech}>
// 					<option value="">Seleccionar...</option>
// 					{allTechs.map((tech) => (
// 						<option key={tech.id} value={tech.name}>
// 							{tech.name}
// 						</option>
// 					))}
// 					<option value="other">Otra...</option>
// 				</select>
// 				{isOtherTech && (
// 					<input
// 						type="text"
// 						name="newTech"
// 						placeholder="Nueva tecnología"
// 						value={formData.newTech}
// 						onChange={handleChange}
// 					/>
// 				)}
// 			</div>
// 			<div>
// 				{selectedTechs.map((tech, index) => (
// 					<span key={index}>
// 						{tech}{' '}
// 						<button type="button" onClick={() => handleRemoveTech(tech)}>
// 							X
// 						</button>
// 					</span>
// 				))}
// 			</div>
// 			<button type="submit">Agregar Proyecto</button>
// 		</form>
// 	)
// }

// export default AddProjectForm
