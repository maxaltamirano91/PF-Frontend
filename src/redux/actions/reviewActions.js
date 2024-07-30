import axios from 'axios'
import { GET_ALL_REVIEWS, CREATE_REVIEW, FETCH_ERROR } from '../types'

export const getAllReviews = (token) => async (dispatch) => {
	try {
		const response = await axios.get('/reviews', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch({ type: GET_ALL_REVIEWS, payload: response })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}

export const createReview = (reviewData, token) => async (dispatch) => {
	try {
		const response = await axios.post('/reviews', reviewData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch({ type: CREATE_REVIEW, payload: response })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}
