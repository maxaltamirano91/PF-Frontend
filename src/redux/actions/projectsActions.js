import axios from 'axios'
import {
	FETCH_PROJECTS,
	FETCH_PROJECT,
	CREATE_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	IMAGE_UPLOAD,
	FILTER_TECHNOLOGIES,
	FETCH_ERROR,
} from '../types'

const URL = 'http://localhost:3001/projects'
const URL_TECHNOLOGIES = 'http://localhost:3001/technologies'
const IMAGE_URL = `https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3`


export const getAllProjects = (pagination, search, technologies) => {
	return async (dispatch) => {
		try {
			const techData = (await axios.get(`${URL_TECHNOLOGIES}`)).data
			const params = new URLSearchParams()

			if (pagination) params.append('pageSize', pagination)
			if (search) params.append('search', search)
			if (technologies) params.append('technologies', technologies)
			else params.append('technologies', techData.map((t) => t.name).join(','))

			const projects = await axios.get(`${URL}?${params.toString()}`)

			dispatch({
				type: FETCH_PROJECTS,
				payload: projects.data,
			})
			dispatch({
				type: FILTER_TECHNOLOGIES,
				payload: technologies,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const getProjectById = (id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`${URL}/${id}`)
		dispatch({
			type: FETCH_PROJECT,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: FETCH_ERROR,
			payload: error.message,
		})
	}
}

export const createProject = (projectData, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(URL, projectData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: CREATE_PROJECT,
				payload: data,
			})
		} catch (error) {
			return dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const updateProject = ({ input, id, token }) => {
	return async function (dispatch) {
		try {
			const { data } = await axios.put(
				`http://localhost:3001/projects/${id}`,
				{ input },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			dispatch({
				type: UPDATE_PROJECT,
				payload: data,
			})
		} catch (error) {
			return dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const deleteProject = ( id, token ) => {
	return async function (dispatch) {
		try {
			await axios.delete(`http://localhost:3001/projects/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: DELETE_PROJECT })
		} catch (error) {
			return dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const uploadImage = (image) => {
	return async function (dispatch) {
		try {
			const formData = new FormData()
			formData.append('image', image)
			const { data } = (await axios.post(IMAGE_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})).data
			return dispatch({
				type: IMAGE_UPLOAD,
				payload: data.url,
			})
		} catch (error) {
			return dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}
