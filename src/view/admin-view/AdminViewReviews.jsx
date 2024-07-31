import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllReviews, deleteReviewById } from '../../redux/actions';

const AdminViewReviews = ({ searchQuery }) => {
	// const dispatch = useDispatch();
	// const reviews = useSelector((state) => state.reviews.allReviews);

	// useEffect(() => {
	// 	dispatch(getAllReviews());
	// }, [dispatch]);

	// const handleDelete = (reviewId) => {
	// 	if (window.confirm('¿Estás seguro de que deseas eliminar esta revisión?')) {
	// 		dispatch(deleteReviewById(reviewId));
	// 	}
	// };

	// const filteredReviews = reviews.filter(
	// 	(review) =>
	// 		review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
	// 		review.id.toString().includes(searchQuery)
	// );

	return (
		<SectionStyled className="ListReviews">
			<div className="accordion accordion-flush" id="accordionFlushExample">
				{/* {filteredReviews && filteredReviews.length > 0 ? (
					filteredReviews.map((review, index) => (
						<div className="accordion-item" key={review.id}>
							<h2 className="accordion-header">
								<span
									className="accordion-button collapsed item"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#flush-collapse${index}`}
									aria-expanded="false"
									aria-controls={`flush-collapse${index}`}
								>
									<div className="d-flex justify-content-between w-100 pe-5 flex-wrap">
										<div className="rating">Rating: {review.rating}</div>
										<div className="comment">{review.comment}</div>
										<div className="id">ID: {review.id}</div>
									</div>
								</span>
							</h2>
							<div
								id={`flush-collapse${index}`}
								className="accordion-collapse collapse"
								data-bs-parent="#accordionFlushExample"
							>
								<div className="card-body card my-2">
									<hr />
									<div className="actions d-flex justify-content-end gap-2">
										<button
											type="button"
											className="btn btn-outline-danger mb-0"
											onClick={() => handleDelete(review.id)}
										>
											Eliminar
										</button>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay revisiones disponibles</p>
				)} */}
			</div>
		</SectionStyled>
	);
};

export default AdminViewReviews;

const SectionStyled = styled.section`
	span.item {
		&:hover {
			background-color: #a7abab39;
		}
	}
`;
