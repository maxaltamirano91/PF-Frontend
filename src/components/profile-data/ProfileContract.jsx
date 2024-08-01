import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './ProfileData.module.css'
import { ContactRound, CircleCheckBig, Briefcase } from 'lucide-react'

const ProfileContract = ({ profileData, handleForm }) => {
	const { loggedUser } = useSelector((state) => state.auth)

	const { id } = useParams()

	return (
		<>
			{loggedUser?.role !== 'admin' &&
				id &&
				loggedUser?.planName !== 'Free' && (
					<div className={styles.contractContainer}>
						<div className={styles.contractTitle}>
							<h3 className={styles.text}>Contratar {profileData?.userName}</h3>
						</div>
						<div>
							<div className={styles.descriptionContainer}>
								<ContactRound strokeWidth={1.25} />
								<span>Contrato espontáneo</span>
								<CircleCheckBig strokeWidth={1.25} />
							</div>
							<div className={styles.contractButtonContainer}>
								<div>
									{profileData?.id && (
										<button
											type="button"
											className="text-primary"
											onClick={handleForm}
										>
											<Briefcase size={18} /> Contratar
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
		</>
	)
}

export default ProfileContract
