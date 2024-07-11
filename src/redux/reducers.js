import { combineReducers } from 'redux';
import { SET_AUTH_TOKEN, LOGOUT } from './actions';

const initialState = {
    authToken: localStorage.getItem('authToken') || null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                authToken: null
            };
        default:
            return state;
    }
};

export default combineReducers({
    auth: authReducer,
});
