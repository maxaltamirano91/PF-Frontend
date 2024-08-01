import axios from 'axios'
import {
	LOGIN_USER,
	LOGOUT_USER,
	LOGIN_REQUEST,
	FETCH_AUTH_ERROR,
	HANDLE_AUTH_ERROR,
} from '../types'

export const loginUser = (userData, loginType) => {
	return async (dispatch) => {
		dispatch({ type: LOGIN_REQUEST })
		try {
			const { data } =
				loginType === 'local'
					? await axios.post('/login', userData)
					: await axios.post('/auth0', userData)
			dispatch({
				type: LOGIN_USER,
				payload: data,
			})
			dispatch({ type: HANDLE_AUTH_ERROR })
		} catch (error) {
			dispatch({
				type: FETCH_AUTH_ERROR,
				payload: 'Credenciales inválidas',
			})
		}
	}
}

export const resetFetchError = () => ({
	type: HANDLE_AUTH_ERROR,
})

export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_USER })
		dispatch({ type: HANDLE_AUTH_ERROR })
	}
}

export const registerUser = (userData) => {
	return async (dispatch) => {
		try {
			await axios.post('/signup', userData)
		} catch (error) {
			dispatch({
				type: FETCH_AUTH_ERROR,
				payload: 'Error al registrar el usuario',
			})
		}
	}
}
