import {
	FETCH_PROJECTS,
	FETCH_PROJECT,
	CREATE_PROJECT,
	UPDATE_PROJECT,
	DELETE_PROJECT,
	IMAGE_UPLOAD,
	GET_DELETED_PROJ,
	GET_DELETED_PROJECTS,
	RESTORE_PROJECT,
} from '../types'

const initialState = {
	allProjects: [],
	project: null,
	imageUrl: null,
	deletedProjects: [],
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

		case GET_DELETED_PROJ:
			return {
				...state,
				project: action.payload,
			}

		case GET_DELETED_PROJECTS:
			return {
				...state,
				deletedProjects: action.payload,
			}

		case RESTORE_PROJECT:
			return {
				...state,
				project: state.deletedProjects.filter(
					(p) => p.id !== action.payload.id
				),
			}

		default:
			return state
	}
}

export default projectsReducer
