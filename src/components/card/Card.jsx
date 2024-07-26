import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { useSelector } from 'react-redux'

const Card = ({ project, toggleLike }) => {
	const { theme } = useSelector((state) => state.themes)
	if (!project.user || !project) return null

	return (
		<div className={styles.cardContainer}>
			<Link
				to={`/projects/${project.id}`}
				className={`${styles.cardImgContainer} ${
					theme === 'light' ? styles.light : ''
				}`}
			>
				<span className={styles.cardTitle}>{project.title}</span>
				<img
					src={project.image}
					alt={project.title}
					className={styles.cardImg}
				/>
			</Link>
			<div className={styles.textContainer}>
				<Link
					to={`/users/${project.user.id}`}
					className={`${styles.profileImg} ${
						theme === 'light' ? 'text-dark' : 'text-light'
					}`}
				>
					<img src={project.user.image} alt={project.user.userName} />
					<span className={styles.name}>{project.user.userName}</span>
				</Link>
				<div onClick={() => toggleLike(project)} className={styles.likeButton}>
					<span>{project.likes.length}</span>
					<ThumbsUp
						className={theme === 'light' ? 'text-dark' : 'text-light'}
						fill={
							project.liked
								? theme === 'light'
									? '#343a40'
									: '#f8f9fa'
								: 'none'
						}
						size={14}
					/>
				</div>
			</div>
			<div className={styles.tagsContainer}>
				{project.tags.map((t) => (
					<span key={t.id}>#{t.tagName}</span>
				))}
			</div>
		</div>
	)
}

export default Card
