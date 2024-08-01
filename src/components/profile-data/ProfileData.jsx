import styles from './ProfileData.module.css'
import ProfileIntro from './ProfileIntro'
import ProfileContract from './ProfileContract'
import ProfileAbout from './ProfileAbout'
import { useSelector } from 'react-redux'

const ProfileData = ({
	profileData,
	handleUnsubscribe,
	loading,
	isCurrentUser,
	handleForm,
}) => {
	const { theme } = useSelector(state => state.themes)

	return (
		<div className={styles.container} style={theme === 'light' ? {backgroundColor: "#f8f9fa"} : {backgroundColor: "#343a40"}}>
			<ProfileIntro theme={theme} profileData={profileData} isCurrentUser={isCurrentUser} />
			<ProfileContract theme={theme} profileData={profileData} handleForm={handleForm} />
			<ProfileAbout theme={theme} profileData={profileData} />
			{isCurrentUser && profileData.planName === 'Premium' ? (
				<div className={styles.buttonContainer}>
					<div
						onClick={handleUnsubscribe}
						className={`${styles.unsubscribeButton} border`}
					>
						<button className={theme === 'light' ? 'btn text-dark' : 'btn text-light'} disabled={loading}>
							{loading ? 'Procesando...' : 'Desuscribirse'}
						</button>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default ProfileData
