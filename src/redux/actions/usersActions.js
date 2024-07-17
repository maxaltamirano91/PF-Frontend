import axios from 'axios'
import {
	FETCH_USERS,
	FETCH_USER,
	UPDATE_USER,
	DELETE_USER,
	FETCH_ERROR,
} from '../types'

const URL = 'http://localhost:3001/users'

export const getAllUsers = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(URL)
			dispatch({ type: FETCH_USERS, payload: response.data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const getUserById = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL}/${id}`)
			dispatch({ type: FETCH_USER, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const updateUser = (id, userData, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`${URL}/${id}`, userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: UPDATE_USER, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const deleteUserById = (id, token) => {
	return async (dispatch) => {
		try {
			await axios.delete(`${URL}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: DELETE_USER })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}
