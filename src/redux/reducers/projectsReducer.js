import {
	FETCH_PROJECTS,
	FETCH_PROJECT,
	CREATE_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	IMAGE_UPLOAD
} from '../types'

const initialState = {
	allProjects: [],
	project: null,
	imageUrl: null
}

const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PROJECTS:
			return {
				...state,
				allProjects: action.payload,
			}

		case FETCH_PROJECT:
			return {
				...state,
				project: action.payload,
			}

		case CREATE_PROJECT:
			return {
				...state,
				project: action.payload,
			}

		case UPDATE_PROJECT:
			return {
				...state,
				project: action.payload,
			}

		case DELETE_PROJECT:
			return {
				...state,
				project: null,
			}

		case IMAGE_UPLOAD:
			return {
				...state,
				imageUrl: null,
			}

		default:
			return state
	}
}

export default projectsReducer
