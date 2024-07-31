import axios from 'axios'
import {
	GET_ALL_REVIEWS,
	GET_USER_REVIEWS,
	CREATE_REVIEW,
	FETCH_ERROR,
} from '../types'

export const getAllReviews = (token) => async (dispatch) => {
	try {
		const { data } = await axios.get('/reviews', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch({ type: GET_ALL_REVIEWS, payload: data })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}

export const getUserReviews = (token, id) => async (dispatch) => {
	try {
		const { data } = await axios.get(`/reviews/users/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log(data);
		dispatch({ type: GET_USER_REVIEWS, payload: data })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}

export const createReview = (reviewData, token, id) => async (dispatch) => {
	try {
		const { data } = await axios.post('/reviews', reviewData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		dispatch(getUserReviews(token, id))
		dispatch({ type: CREATE_REVIEW, payload: data })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}
