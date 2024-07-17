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
	const localStorage = useSelector((state) => state.auth)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [search, setSearch] = useState('')
	const pagination = 5

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
		dispatch(fetchTechnologies(localStorage))
	}, [dispatch, localStorage])
	return (
		<div>
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
				integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
				crossOrigin="anonymous"
				referrerPolicy="no-referrer"
			/>
			<header>
				<div className="search-box" style={{ width: '400px' }}>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search..."
					/>
					<Select
						options={options}
						onChange={handleInputChange}
						value={selectedOptions}
						isMulti={true}
					/>
					<button onClick={handleSubmit}>Apply</button>
				</div>
			</header>
		</div>
	)
}

export default Filter
