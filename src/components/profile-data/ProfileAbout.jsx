import styles from './ProfileData.module.css'
import { ExternalLink } from 'lucide-react'

const ProfileAbout = ({ theme, profileData }) => {
	return (
		<div className={styles.profileAbout}>
			{profileData.links?.length > 0 && (
				<div className={styles.externalLinks}>
					<div className={styles.aboutTitle}>
						<p className={theme === 'light' ? 'text-secondary' : 'text-light'}>Redes sociales</p>
					</div>
					<div className='d-flex flex-column gap-2'>
						{profileData.links.map((link) => (
							<div className={styles.linkButtonContainer} key={link.name}>
								<a href={link.url} className={theme === 'light' ? ' btn btn-outline-light' : ' btn btn-outline-dark text-light'}>
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
					<p className={theme === 'light' ? 'text-secondary' : 'text-light'}>Acerca de mí</p>
				</div>
				<div className={styles.aboutContainer}>
					<div className={styles.aboutContainerDiv}>
						<div className={styles.aboutContainerDivDiv}>
							<div className={styles.aboutContainerDivDivDiv}>
								<div className={theme === 'light' ? 'text-secondary' : 'text-light'}>{profileData.aboutMe}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProfileAbout
