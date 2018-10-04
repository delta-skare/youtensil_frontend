import React, { Component } from 'react';
// import '../css/Login.css';
import AuthService from '../services/AuthService';
import NavBar from './NavBar';
import Footer from './Footer';

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
    .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div className="center">
        <NavBar />
        <div className="card">
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
        <Footer />
      </div>
    );
  }
}

export default Login;
