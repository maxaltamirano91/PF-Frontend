import axios from 'axios'
import {
	GET_ALL_CONTRACTS,
	GET_CONTRACT,
	FETCH_ERROR,
	CONTRACT_FORM_REQUEST,
	CONTRACT_FORM_SUCCESS,
	CONTRACT_FORM_FAILURE,
	DELETE_CONTRACT,
} from '../types'

const contractFormRequest = () => ({
	type: CONTRACT_FORM_REQUEST,
})

const contractFormSuccess = (data) => ({
	type: CONTRACT_FORM_SUCCESS,
	payload: data,
})

const contractFormFailure = (error) => ({
	type: CONTRACT_FORM_FAILURE,
	payload: error,
})

export const getAllContracts = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get("/contracts")
			dispatch({
				type: GET_ALL_CONTRACTS,
				payload: data
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const getContractById = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/contracts/${id}`)
			dispatch({
				type: GET_CONTRACT,
				payload: data
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			})
		}
	}
}

export const contractForm = (formData, token) => {
	return async (dispatch) => {
		dispatch(contractFormRequest())
		try {
			const { data } = await axios.post('/contracts', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch(contractFormSuccess(data))
		} catch (error) {
			dispatch(contractFormFailure(error.message))
		}
	}
}

export const deleteContract = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/contracts/${id}`)
			dispatch({
				type: DELETE_CONTRACT,
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