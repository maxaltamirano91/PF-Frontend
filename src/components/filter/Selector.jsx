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
				<span>Filtrar</span>
			</div>
			<div
				className={`dropdown-menu p-3 ${dropdownOpen ? 'show' : ''}`}
				aria-labelledby="dropdownMenuButton"
				style={{ width: '360px' }} // Ajusta el ancho según tus necesidades
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
