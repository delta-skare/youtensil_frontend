import React, { Component } from 'react'
import { getOrMakeProfileByUserId as getProfile, editProfile } from '../services/ProfileService.js'
import { Button } from 'reactstrap'
import AuthService from '../services/AuthService.js'
import '../css/Full.css'

class FollowButton extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      following: [],
      userId: 0
    }
  }

  // This gets the browsing user's Id
  componentDidMount() {
    if(this.auth.loggedIn()) {
      let userId = this.auth.getUserId()
      getProfile(userId)
      .then(res => {
        this.setState({
          userId: res.user_id,
          following: res.following.split(",")
        })
      })
      .catch(err => alert(err))
    }
  }

  // This occurs on button-click
  handleClick = (e) => {
    e.preventDefault()
    let { following } = this.state
    let { followUserId } = this.props
    console.log(typeof followUserId)
    let joinedFollowing, submission

    // If the user's Id is in the following list, remove it
    if (following.includes(`${followUserId}`)) {
      following.splice(following.indexOf(`${followUserId}`), 1)
    } else {
      // Otherwise, add it in
      following.push(followUserId)
    }

    // Because the database requires a string, turn it into one
    joinedFollowing = following.join(",")
    // ensure we submit a syntactically correct parameter
    submission = {profile: {following: joinedFollowing}}

    // Edit the user's following list and alert accordingly
    editProfile(this.state.userId, submission)
    .then(res=>{
      if (following.includes(`${followUserId}`)) {
        alert('User added to your feed')
      } else {
        alert('User removed from your feed')
      }
      this.setState({ following })
    })
    .catch(err => alert('Please make sure you are properly logged in to follow'))
  }

  render() {
    let { following } = this.state
    let { followText, followUserId } = this.props
    let text
    if (following.includes(`${followUserId}`)) {
      text = 'Unfollow'
    } else {
      text = 'Follow'
    }

    return(
    <Button color="secondary" size="xs" onClick={this.handleClick}>{`${text} ${followText}`}</Button>
    )
  }
}

export default FollowButton
