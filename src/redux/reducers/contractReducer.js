import {
	GET_ALL_CONTRACTS,
	GET_CONTRACT,
	CONTRACT_FORM_REQUEST,
	CONTRACT_FORM_SUCCESS,
	CONTRACT_FORM_FAILURE,
	DELETE_CONTRACT,
} from '../types'

const initialState = {
	allContracts: [],
	contractId: null,
	form: null,
	loading: false,
	error: null,
	deletedContracts: [],
}

const contractFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_CONTRACTS:
			return {
				...state,
				allContracts: action.payload,
			}
		case GET_CONTRACT:
			return {
				...state,
				contractId: action.payload,
			}
		case CONTRACT_FORM_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case CONTRACT_FORM_SUCCESS:
			return {
				...state,
				form: action.payload,
				loading: false,
			}
		case CONTRACT_FORM_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		case DELETE_CONTRACT:
			return {
				...state,
				allContracts: state.allContracts.filter(contract => contract !== action.payload),
			}
		default:
			return state
	}
}

export default contractFormReducer
