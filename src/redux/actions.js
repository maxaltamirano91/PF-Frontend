import axios from 'axios';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const LOGOUT = 'LOGOUT';

export const setAuthToken = (token) => ({
    type: SET_AUTH_TOKEN,
    payload: token
});

export const logout = () => ({
    type: LOGOUT
});

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3001/login', {
            email,
            password
        });
        const token = response.data.token;
        dispatch(setAuthToken(token));
        localStorage.setItem('authToken', token); // Guardar el token en localStorage para persistencia
        return { success: true };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'Credenciales inválidas' };
    }
};
