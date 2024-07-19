import axios from 'axios'
import {
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	FETCH_ERROR,
	HANDLE_ERROR,
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
			dispatch({type: HANDLE_ERROR})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: 'Credenciales inválidas',
			})
		}
	}
}

export const logoutUser = () => {
	return (dispatch) => {
		dispatch({type: LOGOUT_USER})
		dispatch({type: HANDLE_ERROR})
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
				payload: 'Error al registrar el usuario',
			})
		}
	}
}