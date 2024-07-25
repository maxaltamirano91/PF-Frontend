import { FETCH_TAGS, FILTER_TAGS } from '../types'

const initialState = {
	tags: [],
	filteredTags: [],
	fetchError: null,
}

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TAGS:
			return {
				...state,
				tags: action.payload,
			}
		case FILTER_TAGS:
			return {
				...state,
				filteredTags: action.payload,
            }
        
        default:
            return state
	}
}

export default tagsReducer
