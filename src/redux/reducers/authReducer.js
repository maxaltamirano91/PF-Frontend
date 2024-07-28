import {
	LOGIN_USER,
	LOGOUT_USER,
	GET_PROFILE,
	FETCH_AUTH_ERROR,
	LOGIN_REQUEST,
	HANDLE_AUTH_ERROR,
} from '../types'

const initialState = {
	loggedUser: JSON.parse(localStorage.getItem('loggedUser')) || null,
	token: localStorage.getItem('authToken') || null,
	loading: false,
	fetchError: null,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
				fetchError: null,
			}
		case LOGIN_USER:
			localStorage.setItem('authToken', action.payload.token)
			localStorage.setItem('loggedUser', JSON.stringify(action.payload.user));
			return {
				...state,
				loggedUser: action.payload.user,
				token: action.payload.token,
				loading: false,
				fetchError: null,
			}
		case LOGOUT_USER:
			localStorage.removeItem('authToken')
			localStorage.removeItem('loggedUser')
			return { ...state, loggedUser: null, token: null }
		case GET_PROFILE:
			return {
				...state,
				loggedUser: action.payload,
			}
		case FETCH_AUTH_ERROR:
			return {
				...state,
				fetchError: action.payload,
				loading: false,
			}
		case HANDLE_AUTH_ERROR:
			return {
				...state,
				fetchError: null,
			}
		default:
			return state
	}
}

export default authReducer
