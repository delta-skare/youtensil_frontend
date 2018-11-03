import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import registerServiceWorker from './registerServiceWorker';
import UserProfile from './pages/UserProfile';
import UserProfileFeed from './components/UserProfileFeed';
import EditTip from './pages/EditTip';
import UserDashboard from './pages/UserDashboard';
import Landing from './pages/Landing';
import Team from './pages/Team'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import RestaurantSearch from './pages/RestaurantSearch';
import AllTips from "./pages/AllTips";

ReactDOM.render(
    <div>
        <NavBar/>
        <Router>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={Landing}
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
                    path="/user/:userId"
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
                    component={AllTips}
                />
                <Route
                    exact
                    path="/tips/:id/edit"
                    component={EditTip}
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
                <Route
                    exact
                    path="/team"
                    component={Team}
                />
                <Route
                    exact
                    path="/addtip"
                    component={RestaurantSearch}
                />
            </Switch>
        </Router>
        <Footer/>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
