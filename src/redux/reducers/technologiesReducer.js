import {
	FETCH_TECHNOLOGIES,
	CREATE_TECHNOLOGY_SUCCESS,
	CREATE_TECHNOLOGY_FAILURE,
} from '../types'

const initialState = {
	technologies: [],
	fetchError: null,
}

const technologiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TECHNOLOGIES:
			return {
				...state,
				technologies: action.payload,
			}
		case CREATE_TECHNOLOGY_SUCCESS:
			return {
				...state,
				technologies: [...state.technologies, action.payload],
			}
		case CREATE_TECHNOLOGY_FAILURE:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}

export default technologiesReducer
