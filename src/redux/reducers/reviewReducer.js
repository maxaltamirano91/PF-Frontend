import { GET_ALL_REVIEWS, GET_USER_REVIEWS, CREATE_REVIEW } from '../types'

const initialState = {
	reviews: [],
	review: null,
}

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_REVIEWS:
			return { ...state, reviews: action.payload }

		case GET_USER_REVIEWS:
			return { ...state, reviews: action.payload }

		case CREATE_REVIEW:
			return { ...state, review: action.payload }

		default:
			return state
	}
}

export default reviewReducer
