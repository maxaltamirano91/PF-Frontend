import styles from './Filter.module.css'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTechnologies } from '../../redux/actions'
import Searchbar from './Searchbar'
import Selector from './Selector'
import Sort from './Sort'

const Filter = ({ updateSearchParams }) => {
	const dispatch = useDispatch()
	const [search, setSearch] = useState({ title: '', tags: '' })
	const [selectedTechnologies, setSelectedTechnologies] = useState([])
	const [searchByTitle, setSearchByTitle] = useState(true)
	const [sortOrder, setSortOrder] = useState('new')

	useEffect(() => {
		dispatch(fetchTechnologies())
	}, [dispatch])
	const handleTechnologyChange = (select) => {
		setSelectedTechnologies(select)
		updateSearchParams({
			title: searchByTitle ? search.title : '',
			tags: searchByTitle ? '' : search.tags,
			technologies: select.map((t) => t.value).join(','),
			sort: sortOrder,
		})
	}

	const handleSortChange = (sort) => {
		setSortOrder(sort)
		updateSearchParams({
			title: searchByTitle ? search.title : '',
			tags: searchByTitle ? '' : search.tags,
			technologies: selectedTechnologies.map((t) => t.value).join(','),
			sort: sort,
		})
	}

	const handleSearchChange = (e) => {
		setSearch({ ...search, [e.target.name]: e.target.value })
		updateSearchParams({
			title: searchByTitle ? e.target.value : '',
			tags: searchByTitle ? '' : e.target.value,
			technologies: selectedTechnologies.map((t) => t.value).join(','),
			sort: sortOrder,
		})
	}

	return (
		<div className={styles.container}>
			<Selector
				onTechnologyChange={handleTechnologyChange}
				selectedTechnologies={selectedTechnologies}
			/>
			<Searchbar
				value={search}
				onChange={handleSearchChange}
				searchByTitle={searchByTitle}
				toggleSearchByTitle={() => setSearchByTitle(!searchByTitle)}
			/>
			<Sort onSortChange={handleSortChange} />
		</div>
	)
}

export default Filter
