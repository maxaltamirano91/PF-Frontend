import axios from 'axios'
import { LIKES_SUCCESS, LIKES_ERROR } from '../types'

export const toggleProjectLike = ({ userId, projectId }, token) =>
	async (dispatch) => {
		try {
			const { data } = await axios.post(
				'/likes/projects',
				{ userId, projectId },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			dispatch({
				type: LIKES_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: LIKES_ERROR,
				payload: error.message,
			})
		}
	}
