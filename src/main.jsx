import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from 'axios'
import { Auth0Provider } from '@auth0/auth0-react'
import {
	AUTH0_DOMAIN,
	AUTH0_CLIENT_ID,
	FRONT_URL_BASE_FULL,
	BACK_URL_BASE_FULL,
	// DEPLOY_FRONT_URL_BASE_FULL,
	// DEPLOY_BACK_URL_BASE_FULL,
} from '../auth0-config.js'

import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

axios.defaults.baseURL = BACK_URL_BASE_FULL
// axios.defaults.baseURL = DEPLOY_BACK_URL_BASE_FULL

const onRedirectCallback = (appState) => {
	window.history.replaceState(
		{},
		document.title,
		appState?.returnTo || window.location.pathname
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Auth0Provider
		domain={AUTH0_DOMAIN}
		clientId={AUTH0_CLIENT_ID}
		redirectUri={FRONT_URL_BASE_FULL}
		onRedirectCallback={onRedirectCallback}
		audience="YOUR_API_IDENTIFIER"
		scope="openid profile email"
	>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</Auth0Provider>
)
