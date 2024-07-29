import styles from './ProfileData.module.css'
import { ContactRound, CircleCheckBig } from 'lucide-react'

const ProfileContract = ({ profileData }) => {
	return (
		<div className={styles.contractContainer}>
			<div className={styles.contractTitle}>
				<h3 className={styles.text}>Hire {profileData.userName}</h3>
			</div>
			<div>
                <div className={styles.descriptionContainer}>
                    <ContactRound strokeWidth={1.25} />
                    <span>Contrato espontáneo</span>
                    <CircleCheckBig strokeWidth={1.25} />
                </div>
                <div className={styles.contractButtonContainer}>
                    <div>
                        <button className='text-primary'>Contactar</button>
                    </div>
                </div>
            </div>
		</div>
	)
}
export default ProfileContract
