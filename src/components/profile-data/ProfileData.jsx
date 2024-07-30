import styles from './ProfileData.module.css'
import ProfileIntro from './ProfileIntro'
import ProfileContract from './ProfileContract'
import ProfileAbout from './ProfileAbout'

const ProfileData = ({
	profileData,
	handleUnsubscribe,
	loading,
	isCurrentUser,
	handleForm,
}) => {
	return (
		<div className={styles.container}>
			<ProfileIntro profileData={profileData} isCurrentUser={isCurrentUser} />
			<ProfileContract profileData={profileData} handleForm={handleForm} />
			<ProfileAbout profileData={profileData} />
			{isCurrentUser && profileData.planName === 'Premium' ? (
				<div className={styles.buttonContainer}>
					<div
						onClick={handleUnsubscribe}
						className={`${styles.unsubscribeButton} border`}
					>
						<button className="btn text-dark" disabled={loading}>
							{loading ? 'Procesando...' : 'Desuscribirse'}
						</button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default ProfileData
