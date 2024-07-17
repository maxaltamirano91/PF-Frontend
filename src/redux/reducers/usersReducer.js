import {
	FETCH_USERS,
	FETCH_USER,
	UPDATE_USER,
	DELETE_USER,
} from '../types'

const initialState = {
	allUsers: [],
	user: null,
	profile: null,
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS:
			return {
				...state,
				allUsers: action.payload,
			}

		case FETCH_USER:
			return {
				...state,
				user: action.payload,
			}

		case UPDATE_USER:
			return {
				...state,
				user: action.payload,
			}

		case DELETE_USER:
			return {
				...state,
				user: null.payload,
			}

		default:
			return state
	}
}

export default usersReducer
