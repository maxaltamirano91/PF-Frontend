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

const initialState = {
	allContracts: [],
	contract: null,
	loading: false,
	error: null,
	commission: null,
}

const contractReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_CONTRACTS:
			return {
				...state,
				allContracts: action.payload,
				loading: false,
			}
		case GET_CONTRACT:
			return {
				...state,
				contract: action.payload,
				loading: false,
			}
		case CONTRACT_FORM_REQUEST:
		case UPDATE_CONTRACT_STATUS_REQUEST:
		case COMMISSION_CREATION_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case CONTRACT_FORM_SUCCESS:
			return {
				...state,
				allContracts: [...state.allContracts, action.payload],
				loading: false,
			}
		case UPDATE_CONTRACT_STATUS_SUCCESS:
			return {
				...state,
				allContracts: state.allContracts.map((contract) =>
					contract.id === action.payload.id ? action.payload : contract
				),
				loading: false,
			}
		case COMMISSION_CREATION_SUCCESS:
			return {
				...state,
				commission: action.payload,
				loading: false,
			}
		case CONTRACT_FORM_FAILURE:
		case UPDATE_CONTRACT_STATUS_FAILURE:
		case COMMISSION_CREATION_FAILURE:
		case FETCH_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case DELETE_CONTRACT:
			return {
				...state,
				allContracts: state.allContracts.filter(
					(contract) => contract.id !== action.payload.id
				),
				loading: false,
			}
		default:
			return state
	}
}

export default contractReducer
