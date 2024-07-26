import axios from 'axios'
import {
	FETCH_PRODUCT_REQUEST,
	FETCH_PRODUCT_SUCCESS,
	CREATE_PREFERENCE_REQUEST,
	CREATE_PREFERENCE_SUCCESS,
	FETCH_ERROR,
	CANCEL_SUBSCRIPTION_REQUEST,
	CANCEL_SUBSCRIPTION_SUCCESS,
	CANCEL_SUBSCRIPTION_FAILURE,
} from '../types'

export const fetchProduct = () => async (dispatch) => {
	dispatch({ type: FETCH_PRODUCT_REQUEST })
	try {
		const product = {
			title: 'Membresía Premium',
			quantity: 1,
			unit_price: 1,
		}
		dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: product })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}

export const createPreference = (product, token) => async (dispatch) => {
	try {
		const response = await axios.post(
			'/payment/preference',
			{ ...product },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		dispatch({ type: CREATE_PREFERENCE_REQUEST })
		dispatch({ type: CREATE_PREFERENCE_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: FETCH_ERROR, error: error.message })
	}
}

export const cancelSubscription = (token) => async (dispatch) => {
	dispatch({ type: CANCEL_SUBSCRIPTION_REQUEST })
	try {
		const response = await axios.post(
			'/payment/cancel',
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		dispatch({ type: CANCEL_SUBSCRIPTION_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: CANCEL_SUBSCRIPTION_FAILURE, payload: error.message })
	}
}
