import styles from './Reviews.module.css'
import Modal from '../modal/Modal'
import ReviewForm from './ReviewForm'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CirclePlus, Star, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { calculateTimeAgo } from '../../utils/calculateTimeAgo'

const Reviews = ({ profileData, handleReviewFormSubmit, handleDelete }) => {
	const { loggedUser } = useSelector((state) => state.auth)
	const [showModal, setShowModal] = useState(false)

	return (
		<div className={styles.reviewsContainer}>
			{loggedUser?.id !== profileData.id && (
				<div className={styles.cardsContainer}>
					{profileData?.reviewsReceived?.length ? (
						profileData?.reviewsReceived.map((review) => (
							<Link key={review.id} className={styles.cardContentReview}>
								<div className={styles.reviewerHeader}>
									<div className={styles.reviewerImageContent}>
										<img src={review.reviewer.image} alt={review.reviewer.id} />
										<div className={styles.reviewUserNameContent}>
											<h4 className="m-0 text-dark fw-bold fs-6">
												{review.reviewer.userName}
											</h4>
											<span className="text-secondary">
												{calculateTimeAgo(review.createdAt)}
											</span>
										</div>
										{profileData.id === review.reviewedUser.id && (
											<button
												className="btn p-0"
												onClick={() => handleDelete(review.id)}
											>
												<X
													size={16}
													strokeWidth={5}
													color="#6c757d"
													className="mb-4"
												/>
											</button>
										)}
									</div>
								</div>
								<div className={styles.reviewComment}>
									{Array.from({ length: 5 }, (_, index) => (
										<Star
											key={index}
											size={19}
											strokeWidth={0}
											fill={index < review.rating ? '#ffc107' : '#e4e5e9'}
											style={{ cursor: 'pointer' }}
										/>
									))}
									<div className={`${styles.commentContainer} text-dark`}>
										<p>{review.comment}</p>
									</div>
								</div>
							</Link>
						))
					) : loggedUser?.id === profileData.id ? (
						<span>No hay reviews en el perfil</span>
					) : null}
					{/* Mostrar el botón "Añadir review" solo para usuarios Premium */}
					{loggedUser.planName === 'Premium' && (
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
					)}
				</div>
			)}
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
