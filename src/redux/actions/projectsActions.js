import axios from 'axios'
import {
	FETCH_PROJECTS,
	FETCH_PROJECT,
	CREATE_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	IMAGE_UPLOAD,
	FILTER_TAGS,
	FILTER_TECHNOLOGIES,
	FETCH_ERROR,
	GET_DELETED_PROJ,
	GET_DELETED_PROJECTS,
	RESTORE_PROJECT,
	UPDATE_PROJECT_BY_ID,
	DELETE_PROJECT_BY_ID,
} from '../types'

const IMAGE_URL = `https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3`

export const getAllProjects = (data, token) => {
	const { pagination, title, tags, technologies, sort } = data
	return async (dispatch) => {
		try {
			const params = new URLSearchParams()

			if (pagination) params.append('pageSize', pagination)
			if (title) params.append('title', title)
			if (tags && tags.length > 0) params.append('tags', tags)
			if (technologies && technologies.length > 0)
				params.append('technologies', technologies)
			if (sort) params.append('sort', sort)
			const { data } = token
				? await axios.get(`/projects?${params.toString()}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
				})
				: await axios.get(`/projects?${params.toString()}`)

			dispatch({
				type: FETCH_PROJECTS,
				payload: data,
			})

			dispatch({
				type: FILTER_TAGS,
				payload: tags,
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
		const { data } = await axios.get(`/projects/${id}`)
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
			const transformedData = {
				...projectData,
				tags: projectData.tags.map((tag) => ({ tagName: tag.tagName || tag })),
				technologies: projectData.technologies.map((tech) => ({ name: tech })),
			}
			console.log('Datos a enviar:', transformedData)

			const { data } = await axios.post('/projects', transformedData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			dispatch({
				type: CREATE_PROJECT,
				payload: data,
			})
		} catch (error) {
			console.error(
				'Error al crear el proyecto:',
				error.response ? error.response.data : error.message
			)
			return dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}

export const updateProject = (dataToSubmit, token) => {
	return async function (dispatch) {
		try {
			console.log('Token being used:', token)
			const { data } = await axios.put(
				`/projects/profile/${dataToSubmit.id}`,
				dataToSubmit,
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
			console.error('Update project error:', error.response || error.message)
			return dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}

export const deleteProject = (id, token) => {
	return async function (dispatch) {
		try {
			await axios.delete(`/projects/${id}`, {
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

export const getDeletedProjects = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/projects/deleted`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return dispatch({
				type: GET_DELETED_PROJECTS,
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

export const getDeletedProjectById = (id, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/projects/deleted/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return dispatch({
				type: GET_DELETED_PROJ,
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

export const restoreDeletedProject = (id, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(
				`/projects/restore/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			return dispatch({
				type: RESTORE_PROJECT,
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

export const uploadImage = (image) => {
	return async function (dispatch) {
		try {
			const formData = new FormData()
			formData.append('image', image)
			const { data } = (
				await axios.post(IMAGE_URL, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
			).data
			console.log(data.url);
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

export const deleteProjectById = (projectId, token) => async (dispatch) => {
	try {
		await axios.delete(`/projects/${projectId}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		dispatch({ type: DELETE_PROJECT_BY_ID, payload: projectId })
	} catch (error) {
		console.error('Error deleting project:', error)
	}
}

export const updateProjectById = (dataToSubmit, id, token) => {
	return async function (dispatch) {
		try {
			// Convert FormData to object
			const data = Object.fromEntries(dataToSubmit.entries())

			// Parse JSON strings to arrays
			const parsedTags = JSON.parse(data.tags)
			const parsedTechnologies = JSON.parse(data.technologies)

			// Create the data object to send in the request
			const requestData = {
				...data,
				tags: parsedTags,
				technologies: parsedTechnologies,
			}

			console.log('DataToSubmit in action:', requestData)

			const response = await axios.put(`/projects/${id}`, requestData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json', // Change to 'application/json' since we are sending JSON
				},
			})

			dispatch({
				type: UPDATE_PROJECT_BY_ID,
				payload: response.data,
			})
		} catch (error) {
			console.error('Update project error:', error.response || error.message)

			dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}
