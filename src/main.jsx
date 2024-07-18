import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, URL_BASE_FULL } from '../auth0-config.js'

import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

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
		redirectUri={`${URL_BASE_FULL}/home`}
		onRedirectCallback={onRedirectCallback}
	>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</Auth0Provider>
)
