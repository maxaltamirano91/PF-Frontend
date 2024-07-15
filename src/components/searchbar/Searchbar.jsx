import styles from './Searchbar.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProjects } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Searchbar = () => {
	const dispatch = useDispatch()
	const { filteredTechnologies } = useSelector((state) => state)
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [isActive, setIsActive] = useState(false)

	const toggleSearchInput = () => {
		setIsActive(!isActive)
	}

	const handleChange = (e) => {
		setSearch(e.target.value)
	}

	const handleSearch = () => {
		if (search === '') setIsActive(false)
		else {
			dispatch(getAllProjects(search, filteredTechnologies))
			navigate('/home')
		}
	}

	const handleEnter = (e) => {
		if (e.keyCode == 13) {
			dispatch(getAllProjects(search, filteredTechnologies))
			navigate('/home')
		}
	}

	return (
		<div className={styles}> 
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
						onChange={handleChange}
						onKeyDown={handleEnter}
						placeholder="Search..."
					/>
					<button onClick={isActive ? handleSearch : toggleSearchInput}>
						<i className="fa fa-search"></i>
					</button>
				</div>
			</header>
		</div>
	)
}
export default Searchbar