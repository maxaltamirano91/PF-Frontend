import styles from './Reviews.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react'
import Modal from '../modal/Modal'
import ReviewForm from './ReviewForm'

const Reviews = ({ profileData, handleReviewFormSubmit }) => {
	const [showModal, setShowModal] = useState(false);
	console.log(profileData);
	return (
		<div className={styles.reviewsContainer}>
			<div className={styles.cardsContainer}>
				<div className={styles.cardBackground}>
					<Link
						className={styles.cardContent}
						onClick={() => setShowModal(true)}
					>
						<div className={styles.iconContainer}>
							<CirclePlus />
						</div>
						<div className={`${styles.createButton} border text-dark`}>
							<span className={styles.createButtonSpan}>Añadir review</span>
						</div>
					</Link>
				</div>
			</div>
			{profileData?.reviews?.length
				? profileData?.reviews?.map((review) => (
						<div key={review.id} className={styles.cardBackground}>
							<Link className={styles.cardContent}>
								<div className={styles.iconContainer}>
									<CirclePlus />
								</div>
								<div className={`${styles.createButton} border text-dark`}>
									<span className={styles.createButtonSpan}>Añadir review</span>
								</div>
							</Link>
						</div>
				))
				: null}
			<Modal
				centered={true}
				size="md"
				show={showModal}
				content={
					<ReviewForm
						profileData={profileData}
						handleClose={() => setShowModal(false)}
						handleReviewFormSubmit={handleReviewFormSubmit}
					/>
				}
			/>
		</div>
	)
}
export default Reviews
