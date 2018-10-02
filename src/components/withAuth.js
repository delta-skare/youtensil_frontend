import React, { Component } from 'react'
import AuthService from '../services/AuthService'

export default function withAuth(WrappedComponent) {
  const Auth = new AuthService()
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        userId: null
      }
    }

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login')
      }
      else {
        try {
          const userId = Auth.getUserId()
          this.setState({
            userId: userId
          })
        }
        catch(err){
          Auth.logout()
          this.props.history.replace('/login')
        }
      }
    }

    render() {
      if (this.state.userId) {
        return (
          <WrappedComponent history={this.props.history} userId={this.state.userId} />
        )
      }
      else {
        return null
      }
    }
  }
}
