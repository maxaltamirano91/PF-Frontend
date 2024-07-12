import axios from 'axios';
import { SET_DARK_MODE, SET_LIGHT_MODE, SET_AUTH_TOKEN, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, GET_USERS, GET_BY_NAME, GET_DETAIL, CLEAR_DETAIL  } from './actions-types';

export const setAuthToken = (token) => ({
    type: SET_AUTH_TOKEN,
    payload: token
});

export const logout = () => ({
    type: LOGOUT
});

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3001/login', { email, password });
        const token = response.data.token;
        dispatch(setAuthToken(token));
        return { success: true };
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        return { success: false, message: 'Credenciales inválidas' };
    }
};

export const setDarkMode = () => ({
    type: SET_DARK_MODE
});

export const setLightMode = () => ({
    type: SET_LIGHT_MODE
});

  export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerUserRequest());
    try {
      const response = await axios.post('http://localhost:3001/signup', userData);
      dispatch(registerUserSuccess(response.data));
    } catch (error) {
      dispatch(registerUserFailure(error.message));
    }
  };
  
  const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST,
  });
  
  const registerUserSuccess = (data) => ({
    type: REGISTER_USER_SUCCESS,
    payload: data,
  });
  
  const registerUserFailure = (error) => ({
    type: REGISTER_USER_FAILURE,
    payload: error,
  });
  export function getUsers(){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/users/`);
            
            dispatch({
                type: GET_USERS,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
};

export function getByName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/users/?name=${name}`);
            
            dispatch({
                type: GET_BY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching users by name:", error);
            alert(`Error: ${error.message}`);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/users/${id}`);
            
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            });
        } catch (error) {
            console.error(`Error fetching users details for ID ${id}:`, error);
        }
    }
};

export function clearDetail(){
    return{
        type: CLEAR_DETAIL
    }
};

export function getProjects() {
  return async function (dispatch) {
      try {
          const response = await axios.get(`http://localhost:3001/projects`);
          
          dispatch({
              type: GET_PROJECTS,
              payload: response.data
          });
      } catch (error) {
          console.error("Error fetching projects:", error);
      }
  };
}