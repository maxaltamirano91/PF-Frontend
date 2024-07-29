import styles from "./ProfileData.module.css"
import { Link } from "react-router-dom"
import { Pencil } from 'lucide-react'

const ProfileIntro = ({ profileData, isCurrentUser }) => {
	return (
		<div className={styles.dataContainer}>
			<div className={styles.imgContainer}>
				<img
					className={styles.imgContent}
					src={profileData?.image}
					alt={profileData?.userName}
				/>
			</div>
			<h2	 className='text-dark'>{profileData?.userName}</h2>
			<div>
				<div className={styles.infoContainer}>
					<p>{profileData?.email}</p>
					<p>{profileData?.bio}</p>
				</div>
				{isCurrentUser && (
					<div className={styles.dataButtons}>
						<div className={styles.buttonContainer}>
							<Link
								className={`${styles.linkButton} btn btn-primary`}
								to="/create"
							>
								<button className={styles.buttons}>Crear proyecto</button>
							</Link>
						</div>
						<div className={styles.buttonContainer}>
							<Link
								className={`${styles.linkButton} ${styles.editButton} btn btn-outline-light`}
								to="/modUser"
							>
								<button className={styles.buttons}>
									<Pencil fill="#fff" size={16} /> Editar perfil
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default ProfileIntro
