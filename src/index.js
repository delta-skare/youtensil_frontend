import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import UserProfile from './components/UserProfile';
import TipFeed from './components/TipFeed';
import EditTip from './components/EditTip';
import AddTip from './components/AddTip';
import UserDashboard from './components/UserDashboard';
import Landing from './components/Landing';
import UserProfileFeed from './components/UserProfileFeed';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

ReactDOM.render(
  <div>
    <div>
      <NavBar />
    </div>
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
            <Route
              exact
              path="/user"
              component={UserProfile}
            />
            <Route
              exact
              path="/profiles"
              component={UserProfileFeed}
            />
            <Route
              exact
              path="/tips"
              component={TipFeed}
            />
            <Route
              exact
              path="/edittip"
              component={EditTip}
            />
            <Route
              exact
              path="/addtip"
              component={AddTip}
            />
            <Route
              exact
              path="/dashboard"
              component={UserDashboard}
            />
            <Route
              exact
              path="/home"
              component={Landing}
            />
          </Switch>
        </div>
      </Router>
    <div>
    </div>
    <Footer style={{position:"absolute", bottom:"0"}}/>
  </div>
, document.getElementById('root'));
registerServiceWorker();
