import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import projectsReducer from './reducers';

const rootReducer = combineReducers({
    projects: projectsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
