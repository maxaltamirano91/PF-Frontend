import styles from './ProfileProjects.module.css'
import ProfileCard from '../profile-card/ProfileCard'

const ProfileProjects = ({ profileData, onRestore }) => {
	return (
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
	)
}
export default ProfileProjects
