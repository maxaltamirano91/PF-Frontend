import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Domain, auth0ClientId } from '../auth0-config.js';

import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

const ngrokUrl = 'https://27e1-2802-8010-8b3c-e400-f98c-3ec6-5a51-3e3a.ngrok-free.app';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={auth0Domain}
    clientId={auth0ClientId}
    redirectUri={`${ngrokUrl}/home`}
    onRedirectCallback={onRedirectCallback}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);