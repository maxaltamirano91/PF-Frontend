import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile } from '../../redux/actions'
import { Link } from 'react-router-dom'
import Cards from '../../components/cards/Cards'
import styles from './ProfilePage.module.css'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const { token, loggedUser } = useSelector((state) => state.auth)

	useEffect(() => {
		dispatch(getUserProfile(token))
	}, [dispatch, token])

	if (!loggedUser) return <div>Loading ...</div>

	return (
		<div>
			<div className={styles.banner}>
				<h1 className={styles.title}>Bienvenido</h1>
			</div>
			<div className={styles.profileContainer}>
				<div className={styles.card}>
					<div className="m-3 text-center">
						<img
							className={styles.cardImg}
							src={loggedUser.image}
							alt={loggedUser.userName}
						/>
					</div>
					<div className={styles.cardBody}>
						<h2 className="card-title">{loggedUser.userName}</h2>
						<p className="card-text">{loggedUser.email}</p>
						<p className="card-text">{loggedUser.bio}</p>
						<hr />
						<Link to="/myprofile/myfiledproj">
							<button className={styles.btnCustom}>Archivados</button>
						</Link>
						{loggedUser && (
							<Link to="/create">
								<button className={styles.btnCustom}>Crear proyecto</button>
							</Link>
						)}
						<button className={styles.btnCustom}>
  						{loggedUser.planName === 'Premium' ? (
    					'Desuscribirse'
						  ) : (
    					<Link to="/subscription">
    					  Subscribirse
    					</Link>
						  )}
						</button>
					</div>
				</div>
				<div className={styles.profileContent}>
					<h1>Proyectos:</h1>
					<div className={styles.cardsContainer}>
						<Cards projects={loggedUser.projects} displayButtons={true} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
