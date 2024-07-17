import { FETCH_ERROR, HANDLE_ERROR } from '../types'

const initialState = {
	fetchError: null
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
        case FETCH_ERROR:
            return {
              ...state,
              fetchError: [action.payload],
            };
      
          case HANDLE_ERROR:
            return {
              ...state,
              fetchError: state.fetchError.slice(1),
            };

		default:
			return state
	}
}

export default authReducer