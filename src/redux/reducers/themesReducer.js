import { SET_LIGHT_MODE, SET_DARK_MODE } from '../types'

const initialState = {
	theme: localStorage.getItem('theme') || 'dark',
}

const themesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LIGHT_MODE:
			localStorage.setItem('theme', 'light')
			return { ...state, theme: 'light' }
		case SET_DARK_MODE:
			localStorage.setItem('theme', 'dark')
			return { ...state, theme: 'dark' }
		default:
			return state
	}
}

export default themesReducer
