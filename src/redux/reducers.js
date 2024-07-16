import { combineReducers } from 'redux'
import {
	GET_ALL_PROJECTS,
	GET_PROJECT_BY_ID,
	SET_DARK_MODE,
	SET_LIGHT_MODE,
	SET_AUTH_TOKEN,
	LOGOUT,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_REQUEST,
	FETCH_TECHNOLOGIES,
	FILTER_TECHNOLOGIES,
	FETCH_ERROR,
	HANDLE_ERROR,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_FAILURE,
	FETCH_USER_BY_ID_SUCCESS,
	FETCH_USER_BY_ID_FAILURE,
	FETCH_USER_PROFILE_SUCCESS,
	FETCH_USER_PROFILE_FAILURE,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAILURE,
	DELETE_USER_BY_ID_SUCCESS,
	DELETE_USER_BY_ID_FAILURE,
	DELETE_USER_PROFILE_SUCCESS,
	DELETE_USER_PROFILE_FAILURE,
	GET_PROJECT_BY_ID_REQUEST,
	GET_PROJECT_BY_ID_SUCCESS,
	GET_PROJECT_BY_ID_FAILURE,
	MODIFY_PROJECT
} from './actions-types'

const technologiesInitialState = {
	technologies: [],
	filteredTechnologies: [],
	fetchError: null,
}

const initialRegisterState = {
	loading: false,
	user: null,
	error: null,
}

const initialThemeState = {
	theme: localStorage.getItem('theme') || 'light',
}

const authInitialState = {
	authToken: localStorage.getItem('authToken') || null,
}

const projectsInitialState = {
	allProjects: [],
	filteredTechnologies: [],
	project: {},
}

const errorsInitialState = {
	fetchError: null,
}

const themeReducer = (state = initialThemeState, action) => {
	switch (action.type) {
		case SET_DARK_MODE:
			localStorage.setItem('theme', 'dark')
			return { ...state, theme: 'dark' }
		case SET_LIGHT_MODE:
			localStorage.setItem('theme', 'light')
			return { ...state, theme: 'light' }
		default:
			return state
	}
}

const technologiesReducer = (state = technologiesInitialState, action) => {
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

const authReducer = (state = authInitialState, action) => {
	switch (action.type) {
		case SET_AUTH_TOKEN:
			localStorage.setItem('authToken', action.payload)
			return { ...state, authToken: action.payload }
		case LOGOUT:
			localStorage.removeItem('authToken')
			return { ...state, authToken: null }
		default:
			return state
	}
}

const projectsReducer = (state = projectsInitialState, action) => {
	switch (action.type) {
		case GET_ALL_PROJECTS:
			return {
				...state,
				allProjects: action.payload,
			}

		case FILTER_TECHNOLOGIES:
			return {
				...state,
				filteredTechnologies: action.payload,
			}

		case GET_PROJECT_BY_ID:
			return {
				...state,
				project: action.payload,
			}
		case MODIFY_PROJECT:
			return {
				...state,
				project: action.payload
			}

		default:
			return state
	}
}

const registerReducer = (state = initialRegisterState, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return { ...state, loading: true }
		case REGISTER_USER_SUCCESS:
			return { ...state, loading: false, user: action.payload }
		case REGISTER_USER_FAILURE:
			return { ...state, loading: false, error: action.payload }
		default:
			return state
	}
}

const errorReducer = (state = errorsInitialState, action) => {
	switch (action.type) {
		case FETCH_ERROR:
			return {
				...state,
				fetchError: [action.payload],
			}

		case HANDLE_ERROR:
			return {
				...state,
				fetchError: state.fetchError.slice(1),
			}

		default:
			return { ...state }
	}
}

const initialState = {
	users: [],
	user: null,
	allUsers: [],
	userById: null,
	userProfile: null,
	loading: false,
	error: null,
	token: null,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_SUCCESS:
			return {
				...state,
				users: action.payload,
				loading: false,
				error: null,
			}
		case FETCH_USERS_FAILURE:
			return {
				...state,
				users: [],
				loading: false,
				error: action.payload,
			}

		// const initialState = {
		// 	users: [],
		// 	loading: false,
		// 	error: null,
		// 	token: null,
		//   };
		//   const userReducer = (state = initialState, action) => {
		// 	switch (action.type) {
		// 	  case FETCH_USERS_REQUEST:
		// 	  case FETCH_USER_BY_ID_REQUEST:
		// 	  case FETCH_USER_PROFILE_REQUEST:
		// 		return {
		// 		  ...state,
		// 		  loading: true,
		// 		  error: null,
		// 		};
		// 	  case FETCH_USERS_SUCCESS:
		// 		return {
		// 		  ...state,
		// 		  loading: false,
		// 		  allUsers: action.payload,
		// 		  error: null
		// 		};
		case FETCH_USER_BY_ID_SUCCESS:
			return {
				...state,
				userById: action.payload,
				loading: false,
				error: null,
			}
		case FETCH_USER_BY_ID_FAILURE:
			return {
				...state,
				userById: null,
				loading: false,
				error: action.payload,
			}
		case FETCH_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: action.payload,
				loading: false,
				error: null,
			}
		case FETCH_USER_PROFILE_FAILURE:
			return {
				...state,
				userProfile: null,
				loading: false,
				error: action.payload,
			}
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				userById: action.payload,
				loading: false,
				error: null,
			}
		case UPDATE_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case DELETE_USER_BY_ID_SUCCESS:
			return {
				...state,
				userById: null, // Clear userById after deletion
				loading: false,
				error: null,
			}
		case DELETE_USER_BY_ID_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case DELETE_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: null, // Clear userProfile after deletion
				loading: false,
				error: null,
			}
		case DELETE_USER_PROFILE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
const projectDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROJECT_BY_ID_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case GET_PROJECT_BY_ID_SUCCESS:
			return {
				...state,
				loading: false,
				project: action.payload,
			}
		case GET_PROJECT_BY_ID_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export default combineReducers({
	auth: authReducer,
	theme: themeReducer,
	errors: errorReducer,
	project: projectsReducer,
	register: registerReducer,
	technologies: technologiesReducer,
	user: userReducer,
	detail: projectDetailReducer,
})
