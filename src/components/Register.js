import React, { Component } from 'react'
import '../css/TwoThird.css';
import AuthService from '../services/AuthService';
import sideImg from '../images/kristina-bratko-527491-unsplash.jpg';
import { Container, Row, Col } from 'reactstrap';

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
      <Container fluid className="main">
        <Row>
          <Col sm="8">
            <h1>Register</h1>
            <form onSubmit={this.handleFormSubmit.bind(this)} className="form-region">
              <input
                className="form-item"
                placeholder="Email goes here..."
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
          </Col>
          <Col sm="4">
            <img src={sideImg} className="side-image" alt="flavor"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register
