import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchTechnologies,
	filterTechnologies,
	getAllProjects,
} from '../../redux/actions'

const Filter = () => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	const { token } = useSelector((state) => state.auth)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [search, setSearch] = useState('')
	const pagination = 10

	const options = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const handleInputChange = (select) => {
		setSelectedOptions(select)
	}

	const handleSubmit = () => {
		const selectedTechnologies = selectedOptions.map((option) => option.value)
		dispatch(filterTechnologies(selectedTechnologies))
		dispatch(getAllProjects(pagination, search, selectedTechnologies))
	}

	useEffect(() => {
		dispatch(fetchTechnologies(token))
	}, [dispatch, token])
	return (
		<SectionStyled className="">
			<div className="">
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
					integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</div>
			<div className="selects-container ">
				<Select
					options={options}
					onChange={handleInputChange}
					value={selectedOptions}
					isMulti={true}
					placeholder="Selecciona tecnología"
					styles={customStylesSelectReact}
				/>
			</div>
			<div className="search-container ">
				<input
					type="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Nombre del proyecto"
				/>
			</div>
			<div className="btn-container ">
				<button className="btn btn-light" onClick={handleSubmit}>
					Filtrar
				</button>
			</div>
		</SectionStyled>
	)
}

export default Filter

// ? Styles
const SectionStyled = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;

	justify-content: center;
	align-items: center;

	.selects-container {
		color-scheme: light;
	}

	.search-container {
		input {
			height: 39px;
			border-radius: 6px;
			border-color: #a8a8a88e;
			color-scheme: light;
			padding: 0 12px;
			font-weight: 600;
		}
		:focus {
			border-color: #0099ff; /* Cambia el color del borde cuando el input está enfocado */
			outline: none; /* Opcional: elimina el borde de enfoque predeterminado del navegador */
			border-width: 3px;
		}
		::placeholder {
			color: #a8a8a8; /* Cambia esto al color que prefieras */
			color: grey; /* Cambia esto al color que prefieras */
			font-weight: 400;
		}
	}
	.btn-container {
		button {
			margin: 0;
			border-color: #a8a8a88e;
			color: gray;
		}
		&:hover {
			text-decoration: none;
		}
	}
`
const customStylesSelectReact = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: '#fff',
		color: '#333',
		borderColor: state.isFocused ? '#aaa' : '#a8a8a88e',
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: '#333',
		color: '#fff',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused
			? '#757575'
			: state.isSelected
			? '#555'
			: '#333',
		color: '#fff',
	}),
	singleValue: (provided) => ({
		...provided,
		color: '#fff',
	}),
}
