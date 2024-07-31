import styles from './Reviews.module.css'
import { Star } from 'lucide-react'
import { useState } from 'react'

const ReviewForm = ({ profileData, handleClose, handleReviewFormSubmit }) => {
	const [reviewData, setReviewData] = useState({
		rating: 5,
		comment: '',
	})

	const handleClick = (index) => {
		setReviewData((prev) => ({ ...prev, rating: index + 1 }))
	}

	const handleChange = (e) => {
		setReviewData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleReviewFormSubmit(reviewData, handleClose, profileData.id)
	}

	return (
		<div className={styles.reviewFormContainer}>
			<div className={styles.reviewFormUserImage}>
				<img src={profileData.image} alt={profileData.userName} />
			</div>
			<div className={styles.reviewFormUserName}>
				<span className="text-secondary">Dejá tu opinión sobre:</span>
				<h4 className="m-0">{profileData.userName}</h4>
			</div>
			<form className={styles.reviewForm} onSubmit={handleSubmit}>
				<div className={styles.starContainer}>
					{Array.from({ length: 5 }, (_, index) => (
						<Star
							key={index}
							size={38}
							strokeWidth={0}
							onClick={() => handleClick(index)}
							fill={index < reviewData.rating ? '#ffc107' : '#e4e5e9'}
							style={{ cursor: 'pointer' }}
						/>
					))}
				</div>
				<div className={styles.formTextareaContainer}>
					<textarea
						name="comment"
						rows="5"
						className={styles.formTextarea}
						placeholder="Escribe tu comentario..."
						value={reviewData.comment}
						onChange={handleChange}
					></textarea>
				</div>
				<div className={styles.reviewFormButtonSubmit}>
					<button type="submit" className="btn btn-primary">
						Publicar
					</button>
					<button type="button" onClick={handleClose} className="btn">
						Cancelar
					</button>
				</div>
			</form>
		</div>
	)
}

export default ReviewForm
