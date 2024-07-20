import {
	FETCH_SUCCESS,
	FETCH_ERROR,
	HANDLE_SUCCESS,
	HANDLE_ERROR,
} from '../types'

const initialState = {
	fetchSuccess: null,
	fetchError: null,
}

const requestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ERROR:
			return {
				...state,
				fetchError: [action.payload],
			}

		case HANDLE_ERROR:
			return {
				...state,
				fetchError: state.fetchError.slice(1),
			}

		case FETCH_SUCCESS:
			return {
				...state,
				fetchSuccess: [action.payload],
			}

		case HANDLE_SUCCESS:
			return {
				...state,
				fetchSuccess: state.fetchSuccess.slice(1),
			}

		default:
			return state
	}
}

export default requestsReducer
