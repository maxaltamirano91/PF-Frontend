import { CONTRACT_FORM, FETCH_ERROR } from '../types'

const initialState = {
	form: null,
	error: null,
}
const contractFormReducer = (state = initialState, action) => {
	switch (action.type) {
		case CONTRACT_FORM:
			return {
				...state,
				form: action.payload,
			}
		case FETCH_ERROR:
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

export default contractFormReducer
