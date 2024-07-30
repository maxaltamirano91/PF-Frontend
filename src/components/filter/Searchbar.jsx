import styles from './Filter.module.css'
import { useSelector } from 'react-redux'

const Searchbar = ({ value, onChange, searchByTitle, toggleSearchByTitle }) => {
	const { theme } = useSelector((state) => state.themes)

	return (
		<div className={styles.searchContainer}>
			<input
				type="search"
				name={searchByTitle ? 'title' : 'tags'}
				value={searchByTitle ? value?.title : value?.tags}
				className={theme === 'dark' ? '' : 'border'}
				style={theme === 'dark' ? {} : { backgroundColor: '#f8f9fa' }}
				onChange={onChange}
				placeholder="Buscar..."
			/>
			<div
				className={theme === 'dark' ? 'bg-dark' : 'bg-white'}
				onClick={toggleSearchByTitle}
			>
				{searchByTitle ? 'Buscar por Título' : 'Buscar por Tags'}
			</div>
		</div>
	)
}

export default Searchbar
