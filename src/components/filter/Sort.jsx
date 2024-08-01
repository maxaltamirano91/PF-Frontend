import { ArrowUpDown } from 'lucide-react'
import styles from './Filter.module.css'

const Sort = ({ onSortChange }) => {
	return (
		<div className={`${styles.sortContainer} dropdown border`}>
			<div
				className={`${styles.dropdown} dropdown-toggle`}
				id="dropdownMenuButton"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<ArrowUpDown size={16} strokeWidth={3} />
				<span className='fw-bold'>Ordenar por</span>
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
