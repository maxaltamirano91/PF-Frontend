import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'
import styles from './Filter.module.css'

const Filter = ({ updateSearchParams }) => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	const { token } = useSelector((state) => state.auth)
	const [selectedTechnologies, setSelectedTechnologies] = useState([])
	const [titleSearch, setTitleSearch] = useState('')
	const [tagSearch, setTagSearch] = useState('')
	const [sortOrder, setSortOrder] = useState('new')

	// Opciones para el componente Select
	const technologyOptions = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const handleTechnologyChange = (select) => {
		setSelectedTechnologies(select)
	}

	const handleSortChange = (sort) => {
		setSortOrder(sort)
		updateSearchParams({ sort })
	}

	const handleTitleSearch = () => {
		const selectedTechs = selectedTechnologies.map((option) => option.value)
		updateSearchParams({
			title: titleSearch,
			tags: '',
			technologies: selectedTechs.join(','),
		})
	}

	const handleTagSearch = () => {
		const selectedTechs = selectedTechnologies.map((option) => option.value)
		updateSearchParams({
			title: '',
			tags: tagSearch,
			technologies: selectedTechs.join(','),
		})
	}

	useEffect(() => {
		dispatch(fetchTechnologies(token))
	}, [dispatch, token])

	return (
		<section className={styles.section}>
			<div>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
					integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</div>
			<div className={styles.selectsContainer}>
				<Select
					options={technologyOptions}
					onChange={handleTechnologyChange}
					value={selectedTechnologies}
					isMulti={true}
					placeholder="Selecciona tecnología"
					styles={customStylesSelectReact}
				/>
			</div>
			<div className={styles.searchContainer}>
				<input
					type="search"
					value={titleSearch}
					onChange={(e) => setTitleSearch(e.target.value)}
					placeholder="Nombre del proyecto"
				/>
			</div>
			<div className={styles.btnContainer}>
				<button className="btn btn-light" onClick={handleTitleSearch}>
					Buscar Proyectos
				</button>
			</div>
			<div className={styles.searchContainer}>
				<input
					type="search"
					value={tagSearch}
					onChange={(e) => setTagSearch(e.target.value)}
					placeholder="Buscar por Tags"
				/>
			</div>
			<div className={styles.btnContainer}>
				<button className="btn btn-light" onClick={handleTagSearch}>
					Buscar por Tags
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
		</section>
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
