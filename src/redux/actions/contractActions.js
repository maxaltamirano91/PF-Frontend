import axios from 'axios'
import {
	GET_ALL_CONTRACTS,
	GET_CONTRACT,
	FETCH_ERROR,
	CONTRACT_FORM_REQUEST,
	CONTRACT_FORM_SUCCESS,
	CONTRACT_FORM_FAILURE,
	DELETE_CONTRACT,
	UPDATE_CONTRACT_STATUS_REQUEST,
	UPDATE_CONTRACT_STATUS_SUCCESS,
	UPDATE_CONTRACT_STATUS_FAILURE,
	CONTRACT_COMMISSION,
	COMMISSION_CREATION_REQUEST,
	COMMISSION_CREATION_SUCCESS,
	COMMISSION_CREATION_FAILURE,
} from '../types'

// Action creators for contract form
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

const updateContractStatusRequest = () => ({
	type: UPDATE_CONTRACT_STATUS_REQUEST,
})

const updateContractStatusSuccess = (data) => ({
	type: UPDATE_CONTRACT_STATUS_SUCCESS,
	payload: data,
})

const updateContractStatusFailure = (error) => ({
	type: UPDATE_CONTRACT_STATUS_FAILURE,
	payload: error,
})

// Action to get all contracts
export const getAllContracts = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/contracts', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: GET_ALL_CONTRACTS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}

// Action to get a contract by ID
export const getContractById = (id, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/contracts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: GET_CONTRACT,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}

// Action to submit a contract form
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
			dispatch(
				contractFormFailure(
					error.response ? error.response.data : error.message
				)
			)
		}
	}
}

// Action to delete a contract
export const deleteContract = (id, token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/contracts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({
				type: DELETE_CONTRACT,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.response ? error.response.data : error.message,
			})
		}
	}
}

export const rejectContract = (id, token) => {
	return async (dispatch) => {
		dispatch(updateContractStatusRequest())
		try {
			const { data } = await axios.patch(
				`/contracts/status`,
				{ id, status: 'rejected' },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			dispatch(updateContractStatusSuccess(data))
		} catch (error) {
			dispatch(
				updateContractStatusFailure(
					error.response ? error.response.data : error.message
				)
			)
		}
	}
}

export const updateContractStatus = (id, status, token) => {
	return async (dispatch) => {
		dispatch(updateContractStatusRequest())
		try {
			const { data } = await axios.patch(
				`/contracts/status`,
				{ contractId: id, status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			dispatch(updateContractStatusSuccess(data))
		} catch (error) {
			dispatch(
				updateContractStatusFailure(
					error.response ? error.response.data : error.message
				)
			)
		}
	}
}

const commissionCreationRequest = () => ({
	type: COMMISSION_CREATION_REQUEST,
})

const commissionCreationSuccess = (data) => ({
	type: COMMISSION_CREATION_SUCCESS,
	payload: data,
})

const commissionCreationFailure = (error) => ({
	type: COMMISSION_CREATION_FAILURE,
	payload: error,
})

export const createCommission = (contractId, token) => {
	return async (dispatch) => {
		dispatch(commissionCreationRequest())
		try {
			const { data } = await axios.post('/contracts/create-commission', {contractId}, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch(commissionCreationSuccess(data))
		} catch (error) {
			dispatch(
				commissionCreationFailure(
					error.response ? error.response.data : error.message
				)
			)
		}
	}
}