import styles from './ProfileData.module.css'
import { ExternalLink } from 'lucide-react'

const ProfileAbout = ({ profileData }) => {
	return (
		<div className={styles.profileAbout}>
			{profileData.links?.length > 0 && (
				<div className={styles.externalLinks}>
					<div className={styles.aboutTitle}>
						<p>Redes sociales</p>
					</div>
					<div className='d-flex flex-column gap-2'>
						{profileData.links.map((link) => (
							<div className={styles.linkButtonContainer} key={link.name}>
								<a href={link.url} className=' btn btn-outline-light'>
									<span>{link.name}</span>
									<ExternalLink size={14} strokeWidth={1.25} />
								</a>
							</div>
						))}
					</div>
				</div>
			)}
			<div>
				<div className={styles.aboutTitle}>
					<p>Acerca de mí</p>
				</div>
				<div className={styles.aboutContainer}>
					<div className={styles.aboutContainerDiv}>
						<div className={styles.aboutContainerDivDiv}>
							<div className={styles.aboutContainerDivDivDiv}>
								<div className="text-secondary">{profileData.aboutMe}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProfileAbout
