import styles from './ProfileCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileCard = ({ project, onRestore }) => {
	const { theme } = useSelector((state) => state.themes)

	if (!project) return null

	return (
		<div className={styles.cardContainer}>
			<div
				className={`${styles.cardImgContainer} ${
					theme === 'light' ? styles.light : ''
				}`}
			>
				{project.deletedAt !== null ? (
					<span
						onClick={() => onRestore(project.id)}
						className={styles.restore}
					>
						Restaurar
					</span>
				) : null}
				<Link to={`/projects/${project.id}`}>
					<span className={styles.cardTitle}>{project.title}</span>
				</Link>
				<img
					src={project.image}
					alt={project.title}
					className={styles.cardImg}
				/>
			</div>
		</div>
	)
}

export default ProfileCard
