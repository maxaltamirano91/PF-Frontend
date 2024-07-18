import {
	FETCH_TECHNOLOGIES,
	FILTER_TECHNOLOGIES,
} from '../types'

const initialState = {
	technologies: [],
	filteredTechnologies: [],
	fetchError: null,
}

const technologiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TECHNOLOGIES:
			return {
				...state,
				technologies: action.payload,
			}
		case FILTER_TECHNOLOGIES:
			return {
				...state,
				filteredTechnologies: action.payload,
			}

		default:
			return state
	}
}

export default technologiesReducer
