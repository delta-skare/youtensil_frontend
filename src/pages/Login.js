import React, {Component} from 'react';
import {Container, Row, Col, UncontrolledAlert, Button, Input} from 'reactstrap';
import '../css/TwoThird.css';
import AuthService from '../services/AuthService';
import loginImage from '../images/edward-guk-357344-unsplash.jpg'

class Login extends Component {
    constructor() {
        super()
        this.Auth = new AuthService()
        this.state = {
            email: '',
            password: '',
            alert: false
        }
    }

    componentDidMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/dashboard')
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.setState({alert: false}, () => {
            this.Auth.login(this.state.email, this.state.password)
                .then(res => {
                    if (typeof res === 'string') return this.setState({alert: true})
                    this.props.history.replace('/dashboard')
                })
        })
    }

    render() {
        return (
            <Container fluid className="main" style={{height: '96vh', overflow: 'hidden'}}>
                <Row>
                    <Col sm="8" style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="login-form-container">
                            <h1 className="log-reg-header">Login</h1>
                            <form onSubmit={this.handleFormSubmit.bind(this)} className="two-third-form-region">
                                <Input
                                    className="two-third-form-item"
                                    placeholder="Email goes here..."
                                    name="email"
                                    type="text"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.email}
                                />
                                <Input
                                    className="two-third-form-item"
                                    placeholder="Password goes here..."
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.password}
                                />
                                <div className="button-container">
                                    <Button type="submit">Submit</Button>
                                    <Button onClick={() => this.props.history.replace('/register')}>Register</Button>
                                </div>
                            </form>
                            <br/>
                            {this.state.alert &&
                            <UncontrolledAlert color="danger">Invalid credentials. Please double-check your inputs and
                                try again.</UncontrolledAlert>}
                        </div>
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
