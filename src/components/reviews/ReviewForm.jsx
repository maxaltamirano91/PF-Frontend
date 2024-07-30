import styles from './Reviews.module.css'
import { Star } from 'lucide-react'
import { useState } from 'react'

const ReviewForm = ({ profileData }) => {
	const [rating, setRating] = useState(0)

	const handleClick = (index) => {
		setRating(index + 1)
	}

	return (
		<div className={styles.reviewFormContainer}>
			<div className={styles.reviewFormUserImage}>
				<img src={profileData.image} alt={profileData.id} />
			</div>
			<div className={styles.reviewForm}>
				<div className={styles.starContainer}>
					{Array.from({ length: 5 }, (_, index) => (
						<Star
							key={index}
							size={38}
							strokeWidth={0}
							onClick={() => handleClick(index)}
							fill={index < rating ? '#ffc107' : '#e4e5e9'}
						/>
					))}
				</div>
				<div>
					<textarea
						name="comment"
						rows="10"
						className={styles.formTextarea}
						placeholder="Escribe tu comentario..."
					></textarea>
				</div>
			</div>
		</div>
	)
}

export default ReviewForm
