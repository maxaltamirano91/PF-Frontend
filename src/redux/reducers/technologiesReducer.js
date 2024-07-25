import {
	FETCH_TECHNOLOGIES,
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

		default:
			return state
	}
}

export default technologiesReducer
