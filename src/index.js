import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route
          exact
          path='/'
          component={App}
        />
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/login"
          component={Login}
        />

      </Switch>
    </div>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
