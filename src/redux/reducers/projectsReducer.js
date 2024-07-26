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
	UPDATE_PROJECT_BY_ID,
	DELETE_PROJECT_BY_ID,
} from '../types';

const initialState = {
	allProjects: [],
	project: null,
	imageUrl: null,
	deletedProjects: [],
};

const projectsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_PROJECTS:
			return {
				...state,
				allProjects: action.payload,
			};

		case FETCH_PROJECT:
			return {
				...state,
				project: action.payload,
			};

		case CREATE_PROJECT:
			return {
				...state,
				project: action.payload,
			};

		case UPDATE_PROJECT:
			return {
				...state,
				project: action.payload,
			};

		case DELETE_PROJECT:
			return {
				...state,
				project: null,
			};

		case IMAGE_UPLOAD:
			return {
				...state,
				imageUrl: null,
			};

		case GET_DELETED_PROJ:
			return {
				...state,
				project: action.payload,
			};

		case GET_DELETED_PROJECTS:
			return {
				...state,
				deletedProjects: action.payload,
			};

		case RESTORE_PROJECT:
			return {
				...state,
				project: state.deletedProjects.filter(
					(p) => p.id !== action.payload.id
				),
			};

			case UPDATE_PROJECT_BY_ID:
            return {
                ...state,
                allProjects: state.allProjects.map((project) =>
                    project.id === action.payload.id ? action.payload : project
                ),
            };


		case DELETE_PROJECT_BY_ID:
			return {
				...state,
				allProjects: state.allProjects.filter((project) => project.id !== action.payload),
			};

		default:
			return state;
	}
};

export default projectsReducer;
