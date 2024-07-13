import axios from 'axios'
import {
	GET_ALL_PROJECTS,
	SET_DARK_MODE,
	SET_LIGHT_MODE,
	SET_AUTH_TOKEN,
	LOGOUT,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_REQUEST,
	GET_USERS,
	GET_BY_NAME,
	GET_DETAIL,
	CLEAR_DETAIL,
	FETCH_TECHNOLOGIES,
	FILTER_TECHNOLOGIES,
} from './actions-types'

// const AUTH_URL = "http://localhost:3001/";
// const USERS_URL = "http://localhost:3001/users";
const PROJECTS_URL = 'http://localhost:3001/projects'
const URL_TECHNOLOGIES = 'http://localhost:3001/technologies'

export const fetchTechnologies = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_TECHNOLOGIES}`, {
				headers: {
					Authorization: `Bearer ${token.authToken}`,
				},
			})
			dispatch({
				type: FETCH_TECHNOLOGIES,
				payload: data,
			})
		} catch (error) {
			console.error('Error fetching technologies:', error)
		}
	}
}

export const filterTechnologies = (filteredTechnologies) => {
	return (dispatch) => {
		dispatch({
			type: FILTER_TECHNOLOGIES,
			payload: filteredTechnologies,
		})
	}
}

export const getAllProjects = (search, technologies) => {
	return async (dispatch) => {
		try {
			let projects
			if (!search && !technologies) projects = await axios.get(`${PROJECTS_URL}`)
			if (search && !technologies)
				projects = await axios.get(`${PROJECTS_URL}?search=${search}`)
			if (!search && technologies)
				projects = await axios.get(`
					${PROJECTS_URL}?technologies=${technologies}`
				)
			if (search && technologies)
				projects = await axios.get(
					`${PROJECTS_URL}?search=${search}&technologies=${technologies}`
				)
			dispatch({
				type: GET_ALL_PROJECTS,
				payload: projects.data,
			})
			dispatch({
				type: FILTER_TECHNOLOGIES,
				payload: technologies,
			})
		} catch (error) {
			throw error.message
		}
	}
}

export const setAuthToken = (token) => ({
	type: SET_AUTH_TOKEN,
	payload: token,
})

export const logout = () => ({
	type: LOGOUT,
})

export const loginUser = (email, password) => async (dispatch) => {
	try {
		const response = await axios.post('http://localhost:3001/login', {
			email,
			password,
		})
		const token = response.data.token
		dispatch(setAuthToken(token))
		return { success: true }
	} catch (error) {
		console.error('Error during login:', error.response?.data || error.message)
		return { success: false, message: 'Credenciales inválidas' }
	}
}

export const setDarkMode = () => ({
	type: SET_DARK_MODE,
})

export const setLightMode = () => ({
	type: SET_LIGHT_MODE,
})

export const registerUser = (userData) => async (dispatch) => {
	dispatch(registerUserRequest())
	try {
		const response = await axios.post('http://localhost:3001/signup', userData)
		dispatch(registerUserSuccess(response.data))
	} catch (error) {
		dispatch(registerUserFailure(error.message))
	}
}

const registerUserRequest = () => ({
	type: REGISTER_USER_REQUEST,
})

const registerUserSuccess = (data) => ({
	type: REGISTER_USER_SUCCESS,
	payload: data,
})

const registerUserFailure = (error) => ({
	type: REGISTER_USER_FAILURE,
	payload: error,
})
export function getUsers() {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localhost:3001/users/`)

			dispatch({
				type: GET_USERS,
				payload: response.data,
			})
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}
}

export function getByName(name) {
	return async function (dispatch) {
		try {
			const response = await axios.get(
				`http://localhost:3001/users/?name=${name}`
			)

			dispatch({
				type: GET_BY_NAME,
				payload: response.data,
			})
		} catch (error) {
			console.error('Error fetching users by name:', error)
			alert(`Error: ${error.message}`)
		}
	}
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`http://localhost:3001/users/${id}`)

			dispatch({
				type: GET_DETAIL,
				payload: response.data,
			})
		} catch (error) {
			console.error(`Error fetching users details for ID ${id}:`, error)
		}
	}
}

export function clearDetail() {
	return {
		type: CLEAR_DETAIL,
	}
}
