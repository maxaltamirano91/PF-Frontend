import {
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
} from '../types';

const initialState = {
	allReviews: [],
	error: null,
	loading: false,
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEWS_SUCCESS:
			return {
				...state,
				allReviews: action.payload,
				loading: false,
			};
		case GET_REVIEWS_FAILURE:
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
		case DELETE_REVIEW_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default reviewReducer;
