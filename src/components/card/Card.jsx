import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { ThumbsUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
	getUserById,
	getProjectById,
	toggleProjectLike,
} from '../../redux/actions'

const Card = ({ project }) => {
	const dispatch = useDispatch()
	const { loggedUser, token } = useSelector((state) => state.auth)
	const { theme } = useSelector((state) => state.themes)
	const [likes, setLikes] = useState(project.likes?.length || 0)
	const [liked, setLiked] = useState(project.liked || false)

	const toggleLike = () => {
		if (loggedUser && project) {
			const newLiked = !liked
			const newLikes = newLiked ? likes + 1 : likes - 1

			setLiked(newLiked)
			setLikes(newLikes)

			dispatch(
				toggleProjectLike(
					{ projectId: project.id, userId: loggedUser.id },
					token
				)
			)
			dispatch(getProjectById(project.id, token))
		}
	}

	useEffect(() => {
		if (project) {
			dispatch(getUserById(project.userId))
		}
	}, [dispatch, project.userId])

	useEffect(() => {
		setLikes(project.likes?.length)
		setLiked(project.liked || false)
	}, [project])

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
				<div onClick={toggleLike} className={styles.likeButton}>
					<span>{likes}</span>
					<ThumbsUp
						className={theme === 'light' ? 'text-dark' : 'text-light'}
						fill={liked ? (theme === 'light' ? '#343a40' : '#f8f9fa') : 'none'}
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
