import styles from './Filter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { ListFilter } from 'lucide-react'

const Selector = ({ onTechnologyChange, selectedTechnologies }) => {
	const dispatch = useDispatch()
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
		<div className={`${styles.selectContainer} dropdown border`}>
			<div
				className={`${styles.select} dropdown-toggle`}
				aria-expanded={dropdownOpen}
				onClick={toggleDropdown}
			>
				<ListFilter size={16} strokeWidth={3} />
				<span className="fw-bold">Filtrar</span>
			</div>
			<div
				className={`dropdown-menu p-3 ${dropdownOpen ? 'show' : ''}`}
				aria-labelledby="dropdownMenuButton"
				style={{ width: '360px' }}
			>
				<Select
					options={technologyOptions}
					onChange={onTechnologyChange}
					value={selectedTechnologies}
					isMulti={true}
					placeholder="Selecciona tecnología"
					classNamePrefix="react-select"
					styles={customStyles}
				/>
			</div>
		</div>
	)
}

export default Selector

const customStyles = {
	control: (provided, state) => ({
		...provided,
		backgroundColor: '#ffffff',
		color: '#fff',
		borderColor: state.isFocused ? '#aaa' : '#acacac',

		borderWidth: state.isFocused ? '1px' : '1px',
		boxShadow: state.isFocused ? '0 0 0 1px #aaa' : 'none',

		'&:hover': {
			borderColor: state.isFocused ? '#aaa' : '#555',
		},
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: '#3333330',
		color: '#fff',
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused
			? '#cccccc'
			: state.isSelected
			? '#555'
			: '#ffffff',
		color: '#000000',
	}),
	singleValue: (provided) => ({
		...provided,
		color: '#fff',
	}),
}
