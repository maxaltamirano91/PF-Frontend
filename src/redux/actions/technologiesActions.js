import axios from 'axios'
import {
	FETCH_TECHNOLOGIES,
	FETCH_ERROR,
	CREATE_TECHNOLOGY_FAILURE,
	CREATE_TECHNOLOGY_SUCCESS,
} from '../types'

export const fetchTechnologies = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/technologies')
			dispatch({
				type: FETCH_TECHNOLOGIES,
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

export const createTechnology = (name, token) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(
				'/technologies',
				{ name },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)

			const data = response.data

			if (response.status === 201) {
				dispatch({ type: CREATE_TECHNOLOGY_SUCCESS, payload: data })
				dispatch(fetchTechnologies(token))
			} else {
				dispatch({ type: CREATE_TECHNOLOGY_FAILURE, payload: data.message })
			}
		} catch (error) {
			dispatch({ type: CREATE_TECHNOLOGY_FAILURE, payload: error.message })
		}
	}
}
