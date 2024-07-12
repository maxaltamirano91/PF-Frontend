import axios from 'axios';
import { SET_DARK_MODE, SET_LIGHT_MODE, SET_AUTH_TOKEN, LOGOUT } from './actions-types';

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
