import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteReviewById } from '../../redux/actions';
import { Star } from 'lucide-react';

const AdminViewReviews = ({ searchQuery }) => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.review.reviews);
    const token = useSelector((state) => state.auth.token);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(getAllReviews(token));
    }, [dispatch, token, refresh]);

    const handleDelete = (reviewId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta revisión?')) {
            dispatch(deleteReviewById(reviewId, token)).then(() => {
                setRefresh(!refresh); // Toggle the refresh state to trigger useEffect
            });
        }
    };

    const filteredReviews = reviews?.filter(
        (review) =>
            review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.id.toString().includes(searchQuery) ||
            review.reviewer.email.toLowerCase().includes(searchQuery.toLowerCase()) || // Filtrar por correo electrónico del revisor
            review.reviewedUser.email.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrar por correo electrónico del usuario revisado
    );

    return (
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
                                        <div className="Reviewer">
                                            <strong>Reviewer:</strong> {review.reviewer.userName} (Email: <a href={`mailto:${review.reviewer.email}`}>{review.reviewer.email}</a>)
                                        </div>
                                        
                                        <div className="reviewedUser">
                                            <strong>Reviewed User:</strong> {review.reviewedUser.userName} (Email: <a href={`mailto:${review.reviewedUser.email}`}>{review.reviewedUser.email}</a>)
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
                                        <div className="rating">
                                            <strong>Rating:</strong> 
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <Star
                                                    key={index}
                                                    size={19}
                                                    strokeWidth={0}
                                                    fill={index < review.rating ? '#ffc107' : '#e4e5e9'}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                        <div className="review-summary">
                                            <strong>Comment:</strong> {review.comment}
                                        </div>
                                        <div className="reviewID">
                                            <strong>ID:</strong> {review.id}
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
        
    );
};

export default AdminViewReviews;
