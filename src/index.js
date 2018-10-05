import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import ImageUploader from './components/ImageUploader'

ReactDOM.render(
  <Router>
    <div>
      <Route
        exact
        path='/'
        component={App}
      />
      <Route
        exact
        path="/login"
        component={Login}
      />
      <Route
        exact
        path="/image-uploader"
        component={ImageUploader}
      />
    </div>
  </Router>
, document.getElementById('root'));
registerServiceWorker();
