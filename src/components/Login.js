import React, { Component } from 'react';
import '../css/TwoThird.css';
import AuthService from '../services/AuthService';

class Login extends Component {
  constructor(){
    super()
    this.Auth = new AuthService()
    this.state={
      email: '',
      password: ''
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit(e){
    e.preventDefault()
    this.Auth.login(this.state.email,this.state.password)
    .then(res =>{
      this.props.history.replace('/dashboard')
    })
    .catch(err =>{ alert('Invalid credentials. Please double-check your inputs and try again.') })
  }

  render() {
    return (
      <div className="container row">
        <div className="formRegion col-8">
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit.bind(this)}>
            <input
              className="form-item"
              placeholder="email goes here..."
              name="email"
              type="text"
              onChange={this.handleChange.bind(this)}
              value={this.state.email}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange.bind(this)}
              value={this.state.password}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
        <div className="side-image col-4">
          <img src='https://www.seriouseats.com/images/2015/05/20150523-shanghai-streetfood-guotie-fionareilly-slide-14-1500x1200.jpg'/>
        </div>
      </div>
    );
  }
}

export default Login;
