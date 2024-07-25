import { combineReducers } from 'redux';

import authReducer from "./authReducer";
import requestsReducer from "./requestsReducer"
import projectsReducer from "./projectsReducer"
import tagsReducer from './tagsReducer'
import technologiesReducer from "./technologiesReducer"
import themesReducer from "./themesReducer"
import usersReducer from "./usersReducer"
import subscriptionReducer from './subscriptionReducer'; 
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    requests: requestsReducer,
    projects: projectsReducer,
    tags: tagsReducer,
    technologies: technologiesReducer,
    themes: themesReducer,
    users: usersReducer,
    subscription: subscriptionReducer,
    payment: paymentReducer, 
})

export default rootReducer
