import {
	FETCH_USERS,
	FETCH_USER,
	UPDATE_USER,
	DELETE_USER,
	GET_DELETED_USERS
  } from '../types'
  
  const initialState = {
	allUsers: [],
	allDeletedUsers:[],
	user: null,
	profile: null,
  }
  
  const usersReducer = (state = initialState, action) => {
	switch (action.type) {
	  case FETCH_USERS:
		return {
		  ...state,
		  allUsers: action.payload,
		}
  
	  case FETCH_USER:
		return {
		  ...state,
		  user: action.payload,
		}
  
	  case UPDATE_USER:
		// localStorage.setItem('loggedUser', JSON.stringify(action.payload.user));
		return {
			...state,
			loggedUser: action.payload.user,
			fetchError: null,
		};
	  case DELETE_USER:
		return {
		  ...state,
		  allUsers: state.allUsers.filter((user) => user.id !== action.payload),
		}
	case GET_DELETED_USERS:
		return {
			...state,
			allDeletedUsers: action.payload
		}
  
	  default:
		return state
	}
  }
  
  export default usersReducer
  