import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// auth imports
// import * as serviceWorker from './common/serviceWorker';
import { Auth0Provider } from './common/authHook';
import config from './auth-config.json';

// page imports
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';
import Map from './components/Map/Map';

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

const App = () => (
  <Router>
    <Route path="/" exact component={Landing} />
    <Route path="/form" exact component={Form} />
    <Route path="/map" exact component={Map} />
  </Router>
);

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app-root'),
);

// serviceWorker.unregister();
