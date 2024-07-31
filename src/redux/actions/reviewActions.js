import axios from 'axios'
import {
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAILURE,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAILURE,
} from '../types'

export const getAllReviews = (token) => async (dispatch) => {
	try {
		const response = await axios.get('/reviews', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch({ type: GET_REVIEWS_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: GET_REVIEWS_FAILURE, payload: error.message })
	}
}

export const deleteReviewById = (reviewId, token) => async (dispatch) => {
	try {
		await axios.delete(`/api/reviews/${reviewId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch({ type: DELETE_REVIEW_SUCCESS, payload: reviewId })
	} catch (error) {
		dispatch({ type: DELETE_REVIEW_FAILURE, payload: error.message })
	}
}
