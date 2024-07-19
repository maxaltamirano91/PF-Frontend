import axios from 'axios'
import {
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	FETCH_ERROR,
} from '../types'

export const loginUser = (userData, loginType) => {
	return async (dispatch) => {
		try {
			const { data } =
				loginType === 'local'
					? await axios.post('/login', userData)
					: await axios.post('/auth0', userData)
			dispatch({
				type: LOGIN_USER,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const logoutUser = () => {
	return {
		type: LOGOUT_USER,
	}
}

export const registerUser = (userData) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post('/signup', userData)
			dispatch({
				type: REGISTER_USER,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}
