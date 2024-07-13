import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies, filterTechnologies, getAllProjects } from '../redux/actions'

const Filter = () => {
	const dispatch = useDispatch()
	const { technologies } = useSelector((state) => state.technologies)
	const localStorage = useSelector((state) => state.auth)
	const [selectedOptions, setSelectedOptions] = useState([])

	const options = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const handleInputChange = (select) => {
		setSelectedOptions(select)
	}

	const handleSubmit = () => {
		const selectedTechnologies = selectedOptions.map(option => option.value)
		dispatch(filterTechnologies(selectedTechnologies))
		dispatch(getAllProjects('', selectedTechnologies))
    }

	useEffect(() => {
		dispatch(fetchTechnologies(localStorage))
	}, [])
	return (
		<div>
			<Select
				options={options}
				onChange={handleInputChange}
				value={selectedOptions}
				isMulti={true}
			/>
			<button onClick={handleSubmit}>Apply</button>
		</div>
	)
}

export default Filter
