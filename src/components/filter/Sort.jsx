import styles from './Filter.module.css'

const Sort = ({ sortOrder, onSortChange }) => {
	return (
		<div className={`${styles.sortContainer} dropdown`}>
			<div
				className="dropdown-toggle"
				id="dropdownMenuButton"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				Ordenar por {sortOrder}
			</div>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<li>
					<button className="dropdown-item" onClick={() => onSortChange('a-z')}>
						De la A-Z
					</button>
				</li>
				<li>
					<button className="dropdown-item" onClick={() => onSortChange('z-a')}>
						De la Z-A
					</button>
				</li>
				<li>
					<button className="dropdown-item" onClick={() => onSortChange('new')}>
						Los más recientes
					</button>
				</li>
				<li>
					<button className="dropdown-item" onClick={() => onSortChange('old')}>
						Los más antiguos
					</button>
				</li>
			</ul>
		</div>
	)
}

export default Sort
