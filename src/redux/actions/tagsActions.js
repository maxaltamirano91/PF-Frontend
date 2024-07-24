import axios from 'axios'
import { FETCH_TAGS, FILTER_TAGS, FETCH_ERROR } from '../types'

export const fetchTags = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/tags')
			dispatch({
				type: FETCH_TAGS,
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

export const filterTags = (filteredTags) => {
	return (dispatch) => {
		dispatch({
			type: FILTER_TAGS,
			payload: filteredTags,
		})
	}
}
