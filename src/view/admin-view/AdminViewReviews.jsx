import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteReviewById } from '../../redux/actions';

const AdminViewReviews = ({ searchQuery }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review.reviews);
    const token = useSelector((state) => state.auth.token);
    
    useEffect(() => {
        dispatch(getAllReviews(token));
    }, [dispatch, token]);

    const handleDelete = (reviewId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta revisión?')) {
            dispatch(deleteReviewById(reviewId, token));
        }
    };

    const filteredReviews = reviews?.filter(
        (review) =>
            review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.id.toString().includes(searchQuery)
    );

    return (
        <SectionStyled className="ListReviews">
            <div className="accordion accordion-flush" id="accordionFlushExample">
                {filteredReviews && filteredReviews.length > 0 ? (
                    filteredReviews.map((review, index) => (
                        <div className="accordion-item" key={review.id}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed item"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse${index}`}
                                >
                                    <div className="d-flex flex-column w-100 pe-5">
                                        <div className="review-summary">
                                            <strong>Rating:</strong> {review.rating}
                                        </div>
                                        <div className="review-summary">
                                            <strong>Comment:</strong> {review.comment}
                                        </div>
                                        <div className="review-summary">
                                            <strong>ID:</strong> {review.id}
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body card my-2">
                                    <hr />
                                    <div className="review-details">
                                        <div className="reviewer">
                                            <strong>Reviewer:</strong> {review.reviewer.userName} (ID: {review.reviewer.id}, Email: {review.reviewer.email})
                                        </div>
                                        <div className="reviewedUser">
                                            <strong>Reviewed User:</strong> {review.reviewedUser.userName} (ID: {review.reviewedUser.id}, Email: {review.reviewedUser.email})
                                        </div>
                                    </div>
                                    <div className="actions d-flex justify-content-end gap-2 mt-2">
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
                )}
            </div>
        </SectionStyled>
    );
};

export default AdminViewReviews;

const SectionStyled = styled.section`
    .accordion-button {
        border: 1px solid #dee2e6;
        &:
    }


    .review-summary {
        padding: 5px 0;
    }

    .review-details {
        margin-top: 10px;
    }

    span.item {
        &:hover {
            background-color: #a7abab39;
        }
    }
`;
