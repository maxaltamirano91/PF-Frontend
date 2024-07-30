import styles from './Reviews.module.css'

const Reviews = ({ profileData }) => {
	console.log(profileData)
	return (
		<div className={styles.reviewsContainer}>
			<div className={styles.cardsContainer}>
				<div className={styles.card}>
					<div className={styles.cardBackground}></div>
				</div>
			</div>
			{profileData?.reviews?.length
				? profileData?.reviews?.map((project) => (
						<div key={project.id} className={styles.cardsContainer}>
							<div className={styles.card}>
								<div className={styles.cardBackground}></div>
							</div>
						</div>
				))
				: null}
		</div>
	)
}
export default Reviews
