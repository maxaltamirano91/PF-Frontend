import { LOGIN_USER, LOGOUT_USER, GET_PROFILE } from '../types'

const initialState = {
	loggedUser: null,
	token: localStorage.getItem('authToken') || null,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			localStorage.setItem('authToken', action.payload.token)
			return {
				...state,
				loggedUser: action.payload.user,
				token: action.payload.token,
			}

		case LOGOUT_USER:
			localStorage.removeItem('authToken')
			return { ...state, loggedUser: null, token: null }

		case GET_PROFILE:
			return {
				...state,
				loggedUser: action.payload,
			}

		default:
			return state
	}
}

export default authReducer
