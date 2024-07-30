import styles from './Reviews.module.css'

const Reviews = () => {
	return (
		<div className={styles.reviewsContainer}>
			<div className={styles.cardsContainer}>
				<div className={styles.cardContainer}>
					<div className={styles.card}>
						<div className={styles.cardBackground}>
							<div className={styles.cardContent}>
								<div className={styles.createReview}>
									<div className={styles.createReviewComponents}>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Reviews
