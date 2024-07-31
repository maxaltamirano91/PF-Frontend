import { combineReducers } from 'redux'

import authReducer from './authReducer'
import requestsReducer from './requestsReducer'
import projectsReducer from './projectsReducer'
import tagsReducer from './tagsReducer'
import technologiesReducer from './technologiesReducer'
import themesReducer from './themesReducer'
import usersReducer from './usersReducer'
import subscriptionReducer from './subscriptionReducer'
import paymentReducer from './paymentReducer'
import contractFormReducer from './contractReducer'
import reviewReducer from './reviewReducer'
import dataReducer from './dataReducer'

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
	contract: contractFormReducer,
	review: reviewReducer,
	data: dataReducer
})

export default rootReducer
