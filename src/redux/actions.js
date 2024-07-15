import axios from 'axios';
import {
	GET_ALL_PROJECTS,
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
} from './actions-types';

const AUTH_URL = "http://localhost:3001";
const USERS_URL = "http://localhost:3001/users";
const PROJECTS_URL = 'http://localhost:3001/projects';
const URL_TECHNOLOGIES = 'http://localhost:3001/technologies';

export const getProjectByIdRequest = () => ({
	type: GET_PROJECT_BY_ID_REQUEST,
  });
  
  export const getProjectByIdSuccess = (project) => ({
	type: GET_PROJECT_BY_ID_SUCCESS,
	payload: project,
  });
  
  export const getProjectByIdFailure = (error) => ({
	type: GET_PROJECT_BY_ID_FAILURE,
	payload: error,
  });
  
  export const getProjectById = (projectId) => async (dispatch) => {
	dispatch(getProjectByIdRequest());
	try {
	  const response = await axios.get(`${PROJECTS_URL}/${projectId}`);
	  dispatch(getProjectByIdSuccess(response.data));
	} catch (error) {
	  dispatch(getProjectByIdFailure(error.message));
	}
  };
  


export const fetchTechnologies = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`${URL_TECHNOLOGIES}`, {
				headers: {
					Authorization: `Bearer ${token.authToken}`,
				},
			});
			dispatch({
				type: FETCH_TECHNOLOGIES,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			});
		}
	};
};

export const filterTechnologies = (filteredTechnologies) => {
	return (dispatch) => {
		dispatch({
			type: FILTER_TECHNOLOGIES,
			payload: filteredTechnologies,
		});
	};
};

export const getAllProjects = (pagination, search, technologies) => {
	return async (dispatch) => {
		try {
			let projects;
			if (!search && !technologies) {
				projects = await axios.get(`${PROJECTS_URL}?pageSize=${pagination}`);
			}
			if (search && !technologies) {
				projects = await axios.get(`${PROJECTS_URL}?search=${search}&pageSize=${pagination}`);
			}
			if (!search && technologies) {
				projects = await axios.get(`${PROJECTS_URL}?technologies=${technologies}&pageSize=${pagination}`);
			}
			if (search && technologies) {
				projects = await axios.get(`${PROJECTS_URL}?search=${search}&technologies=${technologies}&pageSize=${pagination}`);
			}
			dispatch({
				type: GET_ALL_PROJECTS,
				payload: projects.data,
			});
			dispatch({
				type: FILTER_TECHNOLOGIES,
				payload: technologies,
			});
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			});
		}
	};
};

export const setAuthToken = (token) => ({
	type: SET_AUTH_TOKEN,
	payload: token,
  });
  
  export const logout = () => ({
	type: LOGOUT,
  });
  
  export const fetchError = (error) => ({
	type: FETCH_ERROR,
	payload: error,
  });

export const loginUser = (email, password) => async (dispatch) => {
	try {
		const response = await axios.post(`${AUTH_URL}/login`, {
			email,
			password,
		});
		const token = response.data.token;
		dispatch(setAuthToken(token));
		return { success: true };
	} catch (error) {
		dispatch({
			type: FETCH_ERROR,
			payload: error.message,
		});
		return { success: false, message: 'Credenciales inválidas' };
	}
};

export const setDarkMode = () => ({
	type: SET_DARK_MODE,
});

export const setLightMode = () => ({
	type: SET_LIGHT_MODE,
});

export const registerUser = (userData) => async (dispatch) => {
	dispatch(registerUserRequest());
	try {
		const response = await axios.post(`${AUTH_URL}/signup`, userData);
		dispatch(registerUserSuccess(response.data));
	} catch (error) {
		console.log(error);
		dispatch(registerUserFailure(error.message));
		dispatch({
			type: FETCH_ERROR,
			payload: "error en la creacion de usuario",
		});
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

export const getAllUsers = (token) => {
	return async (dispatch) => {
		try {
			if (!token) {
				throw new Error('Token is undefined or null')
			}

			const response = await axios.get(USERS_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data })
		} catch (error) {
			dispatch({ type: FETCH_USERS_FAILURE, payload: error.message })
		}
	}
}

export const getByName = (name) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${AUTH_URL}/?name=${name}`);
			dispatch({
				type: GET_BY_NAME,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			});
		}
	};
};

export const getUserById = (userId, token) => {
	return async (dispatch) => {
		try {
			console.log('Fetching user by ID:', userId);
			const response = await axios.get(`${USERS_URL}/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('User data received:', response.data.user);
			dispatch({ type: FETCH_USER_BY_ID_SUCCESS, payload: response.data.user });
		} catch (error) {
			console.error('Error fetching user by ID:', error.message);
			dispatch({ type: FETCH_USER_BY_ID_FAILURE, payload: error.message });
		}
	};
};

export const getUserProfile = (token) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`${USERS_URL}/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('User profile data received:', response.data.profile);
			dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data.profile });
		} catch (error) {
			console.error('Error fetching user profile:', error.message);
			dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
		}
	};
};

export const updateUser = (userId, userData, token) => {
	return async (dispatch) => {
		try {
			console.log('Updating user:', userId, userData);
			const response = await axios.put(`${USERS_URL}/${userId}`, userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('User updated:', response.data.updatedUser);
			dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data.updatedUser });
		} catch (error) {
			console.error('Error updating user:', error.message);
			dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
		}
	};
};

export const deleteUserById = (userId, token) => {
	return async (dispatch) => {
		try {
			console.log('Deleting user by ID:', userId);
			await axios.delete(`${USERS_URL}/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('User deleted:', userId);
			dispatch({ type: DELETE_USER_BY_ID_SUCCESS, payload: userId });
		} catch (error) {
			console.error('Error deleting user by ID:', error.message);
			dispatch({ type: DELETE_USER_BY_ID_FAILURE, payload: error.message });
		}
	};
};

export const deleteUserProfile = (token) => {
	return async (dispatch) => {
		try {
			console.log('Deleting user profile');
			await axios.delete(`${USERS_URL}/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log('User profile deleted');
			dispatch({ type: DELETE_USER_PROFILE_SUCCESS });
		} catch (error) {
			console.error('Error deleting user profile:', error.message);
			dispatch({ type: DELETE_USER_PROFILE_FAILURE, payload: error.message });
		}
	};
};

export const handleError = () => ({
	type: HANDLE_ERROR,
});

