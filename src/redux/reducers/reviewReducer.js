import {
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
	GET_ALL_REVIEWS,
	GET_USER_REVIEWS,
	CREATE_REVIEW,
} from '../types';

const initialState = {
	allReviews: [],
	review: null,
	error: null,
	loading: false,
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_REVIEWS:
		case GET_USER_REVIEWS:
		case GET_REVIEWS_SUCCESS:
			return {
				...state,
				allReviews: action.payload,
				loading: false,
			};
		case CREATE_REVIEW:
			return {
				...state,
				review: action.payload,
			};
		case GET_REVIEWS_FAILURE:
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				allReviews: state.allReviews.filter(review => review.id !== action.payload),
			};
		default:
			return state;
	}
};

export default reviewReducer;
