import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
	getUserById,
	getProjectById,
	toggleProjectLike,
} from '../../redux/actions'

const Card = ({ project }) => {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.users)
	const { loggedUser, token } = useSelector((state) => state.auth)
	const [likes, setLikes] = useState(project.likes?.length)
	const [liked, setLiked] = useState(project.liked || false)

	const toggleLike = () => {
		if (loggedUser && project) {
			dispatch(
				toggleProjectLike(
					{ projectId: project.id, userId: loggedUser.id },
					token
				)
			)
			const updatedProject = dispatch(getProjectById(project.id, token))
			setLikes(updatedProject.likes?.length || 0)
			setLiked(updatedProject.liked || false)
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

	if (!user || !project) return null

	return (
		<div className={styles.cardContainer}>
			<Link to={`/projects/${project.id}`} className={styles.cardImgContainer}>
				<span className={styles.cardTitle}>{project.title}</span>
				<img
					src={project.image}
					alt={project.title}
					className={styles.cardImg}
				/>
			</Link>
			<div className={styles.textContainer}>
				<Link to={`/users/${user.id}`} className={styles.profileImg}>
					<img src={user.image} alt={user.userName} />
					<span>{user.userName}</span>
				</Link>
				<div>
					<span>
						{likes}
						<button
							onClick={toggleLike}
							className={liked ? styles.liked : styles.notLiked}
						>
							Like
						</button>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Card
