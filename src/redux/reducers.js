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
			console.log(action.payload)
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

export default combineReducers({
	auth: authReducer,
	theme: themeReducer,
	errors: errorReducer,
	project: projectsReducer,
	register: registerReducer,
	technologies: technologiesReducer,
})
