import {
	FETCH_USERS,
	FETCH_USER,
	UPDATE_USER,
	DELETE_USER,
  } from '../types'
  
  const initialState = {
	allUsers: [],
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
		return {
		  ...state,
		  allUsers: state.allUsers.map((user) =>
			user.id === action.payload.id ? action.payload : user
		  ),
		}
  
	  case DELETE_USER:
		return {
		  ...state,
		  allUsers: state.allUsers.filter((user) => user.id !== action.payload),
		}
  
	  default:
		return state
	}
  }
  
  export default usersReducer
  