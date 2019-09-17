import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// page imports
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';
import Map from './components/Map/Map';

const App = () => (
  <Router>
    <Route path="/" exact component={Landing} />
    <Route path="/form" exact component={Form} />
    <Route path="/map" exact component={Map} />
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app-root'));
