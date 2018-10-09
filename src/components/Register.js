import React, { Component } from 'react'
import '../css/TwoThird.css';
import AuthService from '../services/AuthService';
import sideImg from '../images/sharon-chen-352895-unsplash.jpg';
import NavBar from './NavBar'


class Register extends Component {
  constructor(){
    super()
    this.Auth = new AuthService()
    this.state={
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit(e){
    e.preventDefault()
    this.Auth.register({user: this.state})
    .then(res =>{
      this.props.history.replace('/dashboard')
    })
    .catch(err =>{ alert('Invalid credentials. Please make sure email is not in use and that password fields are identical.') })
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container row">
          <div className="formRegion col-8">
            <h1 className="blktext">Register</h1>
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
                className="form-item"
                placeholder="Confirm password"
                name="password_confirmation"
                type="password"
                onChange={this.handleChange.bind(this)}
                value={this.state.password_confirmation}
              />
              <input
                className="form-submit"
                value="SUBMIT"
                type="submit"
              />
            </form>
          </div>
          <div className="side-image col-4">
            <img src={sideImg}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Register
