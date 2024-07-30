import styles from './Filter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const Selector = ({ onTechnologyChange, selectedTechnologies }) => {
	const dispatch = useDispatch()
	const { theme } = useSelector((state) => state.themes)
	const { technologies } = useSelector((state) => state.technologies)
	const [dropdownOpen, setDropdownOpen] = useState(false)

	useEffect(() => {
		dispatch(fetchTechnologies())
	}, [dispatch])

	const technologyOptions = technologies.map((tech) => ({
		value: tech.name,
		label: tech.name,
		key: tech.name,
	}))

	const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

	return (
		<div
			className={`${theme === 'dark' ? '' : 'border'} ${
				styles.selectContainer
			} dropdown`}
			style={theme === 'dark' ? {} : { backgroundColor: '#f8f9fa' }}
		>
			<div
				className={`${styles.select} dropdown-toggle`}
				aria-expanded={dropdownOpen}
				onClick={toggleDropdown}
			>
				Filtrar
			</div>
			<div
				className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
				aria-labelledby="dropdownMenuButton"
			>
				<div className="p-3">
					<Select
						options={technologyOptions}
						onChange={onTechnologyChange}
						value={selectedTechnologies}
						isMulti={true}
						placeholder="Selecciona tecnología"
						classNamePrefix="react-select"
					/>
				</div>
			</div>
		</div>
	)
}

export default Selector
