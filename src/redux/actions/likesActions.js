import axios from 'axios'
import { LIKES_ERROR } from '../types'
import { getAllProjects, getProjectById } from './projectsActions'

export const toggleProjectLike = (ids, data, token) => async (dispatch) => {
	try {
		await axios.post('/likes/projects', ids, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch(getProjectById(data))
		dispatch(getAllProjects(data, token))
	} catch (error) {
		dispatch({
			type: LIKES_ERROR,
			payload: error.message,
		})
	}
}
