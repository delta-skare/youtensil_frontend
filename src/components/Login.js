import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../css/TwoThird.css';
import AuthService from '../services/AuthService';
import loginImage from '../images/edward-guk-357344-unsplash.jpg'

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
      <Container fluid>
        <Row>
          <Col sm="8">
            <h1>Login</h1>
            <form onSubmit={this.handleFormSubmit.bind(this)} className="form-region">
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
          </Col>
          <Col sm="4">
            <img src={loginImage} className="side-image" alt="flavor"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
