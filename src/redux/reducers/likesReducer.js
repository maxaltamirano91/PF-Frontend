import { LIKES_SUCCESS, LIKES_ERROR } from '../types'

const initialState = {
	likesSuccess: null,
	likesErrors: null,
}

const likesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIKES_SUCCESS:
			return { ...state, likesSuccess: action.payload }

		case LIKES_ERROR:
			return { ...state, likesErrors: action.payload }

		default:
			return state
	}
}

export default likesReducer
