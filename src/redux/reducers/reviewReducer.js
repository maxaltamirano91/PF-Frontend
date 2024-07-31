import {
	GET_REVIEWS_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	GET_ALL_REVIEWS,

	CREATE_REVIEW,
    FETCH_ERROR
} from '../types';

const initialState = {
    reviews: [],
    review: null,
    error: null,
    loading: false,
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false,
                error: null,
            };
        case CREATE_REVIEW:
            return {
                ...state,
                review: action.payload,
                error: null,
            };
        case GET_REVIEWS_FAILURE:
        case DELETE_REVIEW_FAILURE:
        case FETCH_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                reviews: state.allReviews.filter(review => review.id !== action.payload),
                error: null,
            };
        default:
            return state;
    }
};

export default reviewReducer;