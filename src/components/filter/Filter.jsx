import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies, getAllProjects } from '../../redux/actions'
import styles from './Filter.module.css'
import Select from 'react-select'

const Filter = () => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	const { token } = useSelector((state) => state.auth)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [search, setSearch] = useState('')
	const [sortOrder, setSortOrder] = useState('new')
	const pagination = 10

	const options = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const handleInputChange = (select) => {
		setSelectedOptions(select)
	}

	const handleSortChange = (sort) => {
		setSortOrder(sort)
	}

	const handleSubmit = () => {
		const selectedTechnologies = selectedOptions.map((option) => option.value)
		dispatch(
			getAllProjects(pagination, search, selectedTechnologies, sortOrder)
		)
	}

	useEffect(() => {
		dispatch(fetchTechnologies(token))
	}, [dispatch, token])

	return (
		<div className={styles.section}>
			<div className={styles.selectsContainer}>
				<Select
					options={options}
					onChange={handleInputChange}
					value={selectedOptions}
					isMulti={true}
					placeholder="Selecciona tecnología"
					styles={customStylesSelectReact}
				/>
			</div>
			<div className={styles.searchContainer}>
				<input
					type="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Nombre del proyecto"
				/>
			</div>
			<div className={styles.btnContainer}>
				<button className="btn btn-light" onClick={handleSubmit}>
					Filtrar
				</button>
			</div>
			<div className={styles.sortButtons}>
				<button
					className={sortOrder === 'a-z' ? styles.selected : ''}
					onClick={() => handleSortChange('a-z')}
				>
					A-Z
				</button>
				<button
					className={sortOrder === 'z-a' ? styles.selected : ''}
					onClick={() => handleSortChange('z-a')}
				>
					Z-A
				</button>
				<button
					className={sortOrder === 'new' ? styles.selected : ''}
					onClick={() => handleSortChange('new')}
				>
					Recientes
				</button>
				<button
					className={sortOrder === 'old' ? styles.selected : ''}
					onClick={() => handleSortChange('old')}
				>
					Viejos
				</button>
			</div>
		</div>
	)
}

export default Filter

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
