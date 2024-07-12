import { combineReducers } from 'redux';
import { SET_DARK_MODE, SET_LIGHT_MODE, SET_AUTH_TOKEN, LOGOUT } from './actions-types';

const initialThemeState = {
    theme: localStorage.getItem('theme') || 'light'
};

const themeReducer = (state = initialThemeState, action) => {
    switch (action.type) {
        case SET_DARK_MODE:
            localStorage.setItem('theme', 'dark');
            return { ...state, theme: 'dark' };
        case SET_LIGHT_MODE:
            localStorage.setItem('theme', 'light');
            return { ...state, theme: 'light' };
        default:
            return state;
    }
};

const authInitialState = {
    authToken: localStorage.getItem('authToken') || null
};

const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            localStorage.setItem('authToken', action.payload);
            return { ...state, authToken: action.payload };
        case LOGOUT:
            localStorage.removeItem('authToken');
            return { ...state, authToken: null };
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
    theme: themeReducer
});
