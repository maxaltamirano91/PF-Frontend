import styles from './ProfileProjects.module.css'
import ProfileCard from '../card/ProfileCard'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileProjects = ({ tabName, profileData, onRestore }) => {
	const { loggedUser } = useSelector((state) => state.auth)
	return (
		<div className={styles.projectsContainer}>
			<div className={styles.titleContainer}>
				<h1>{tabName}</h1>
				<div></div>
				{loggedUser.id === profileData?.id &&
					profileData?.planName !== 'Premium' &&
					profileData?.role !== 'admin' && (
						<Link to="/subscription" className={`${styles.button}`}>
							<button className='btn btn-light border'>Actualizar a PRO</button>
						</Link>
					)}
			</div>
			<div>
				<div className={styles.cardsContainer}>
					{profileData?.projects?.length ? (
						profileData?.projects?.map((project) => (
							<div key={project?.id} className={styles.card}>
								<ProfileCard project={project} onRestore={onRestore} />
							</div>
						))
					) : (
						<p>No se encontraron los proyectos</p>
					)}
				</div>
			</div>
		</div>
	)
}
export default ProfileProjects
