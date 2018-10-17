import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import '../css/Full.css';
import logo from '../images/youtensil_tagline_blk.png'
import AuthService from '../services/AuthService'


class Landing extends Component {
  render() {
    let redirect
    let Auth = new AuthService()
    if(Auth.loggedIn()) {
      redirect = <Redirect to="/dashboard" />
    }
    return (
      <div className="background main">
        {redirect}
          <div>
            <img className="img-logo" src={logo} alt="Youtensil Logo"/>
            <div>
              <Link to="/login"  style={{textDecoration:'none'}}>
                <Button className="landing-buttons">Login</Button>
              </Link>
                <br></br>
              <Link to="/register"  style={{textDecoration:'none'}}>
                <Button className="landing-buttons">Register</Button>
              </Link>
            </div>
          </div>
      </div>
    );
  }
}

export default Landing;
