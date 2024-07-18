import axios from 'axios'
import {
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	GET_PROFILE,
	FETCH_ERROR,
} from '../types'

const URL = 'http://localhost:3001'
const USERS_URL = 'http://localhost:3001/users'

export const loginUser = (userData, loginType) => {
	return async (dispatch) => {
		try {
			console.log(userData);
			const { data } =
				loginType === 'local'
					? await axios.post(`${URL}/login`, userData)
					: await axios.post(`${URL}/auth0`, {}, {
						headers: {
							Authorization: `Bearer ${userData}`,
						},
					})
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
			const { data } = await axios.post(`${URL}/signup`, userData)
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

export const getUserProfile = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${USERS_URL}/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: GET_PROFILE, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}
