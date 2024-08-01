import axios from 'axios'
import {
	FETCH_USERS,
	FETCH_USER,
	UPDATE_USER,
	DELETE_USER,
	GET_PROFILE,
	FETCH_ERROR,
	GET_DELETED_USERS,
	RESTORE_USER
} from '../types'

export const getAllUsers = (data, token) => {
	const { pagination=10, search='', sort='a-z' } = data
	return async (dispatch) => {
		try {
			const params = new URLSearchParams()

			if (pagination) params.append('pageSize', pagination)
			if (search) params.append('search', search)
			if (sort) params.append('sort', sort)

			const { data } = await axios.get(`/users?${params}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: FETCH_USERS, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const getUserById = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/users/${id}`)
			dispatch({ type: FETCH_USER, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const updateUser = (userData, token) => async (dispatch) => {
    try {
		console.log(userData);
        const response = await axios.put('/users/profile', userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: UPDATE_USER,
            payload: response.data, 
        });

        return response; 
    } catch (error) {
		dispatch({ type: FETCH_ERROR, payload: error.message });

        return error.response; 
    }
};

export const updateUserByID = (userData, token) => {
	console.log(userData);
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/users/${userData.id}`, userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: UPDATE_USER, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const deleteUserById = (id, token) => {
	return async (dispatch) => {
		try {
			await axios.delete(`/users/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: DELETE_USER, payload: id })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const deleteUserProfile = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.delete(`/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: DELETE_USER, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const getUserProfile = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/users/profile', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: GET_PROFILE, payload: data })
		} catch (error) {
			dispatch({ type: FETCH_ERROR, payload: error.message })
		}
	}
}

export const getDeletedUsers = (token) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/users/deleted', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: GET_DELETED_USERS, payload: data })
		}catch(error){
			dispatch({ type: FETCH_ERROR, payload:error.message })
		}
	}
}

export const restoreUser = (id, token) => {
	return async(dispatch) => {
		try{
			const { data } = await axios.post(`/users/restore/${id}`, null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			dispatch({ type: RESTORE_USER, payload: data })
		}
		catch(error){
			dispatch({ type: FETCH_ERROR, payload:error.message })
		}
	}
}