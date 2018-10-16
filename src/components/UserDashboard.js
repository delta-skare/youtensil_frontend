import React, { Component } from 'react';
import withAuth from './withAuth'
import AuthService from '../services/AuthService'
import TipFeed from './TipFeed'
import { getOrMakeProfileByUserId as getProfile } from '../services/ProfileService'
import '../css/dashboard.css'

class userDashboard extends Component {
  constructor(props){
    super(props)
    this.Auth = new AuthService()
    this.state = {
      // Information will get stored here on render and is what the user sees
      currentProfile: {},
      // These two objects are updated from form inputs
      // Profile is also filled on render
      // user.current_password_email exists to not have value repetition in input forms
      profile: {},
      user: {
        email: "",
        password: "",
        password_confirmation: "",
        current_password: "",
        current_password_email: ""
      },
      // This object is used to toggle viewability of form fields
      form: {
        username: false,
        food_types: false,
        password: false,
        bio: false,
        image: false,
        email: false
      }
    }
  }
  // This gets the current user's profile data on render and sets state
  // Need to figure out how to get email from devise
  componentDidMount() {
    getProfile(this.props.userId)
    .then(profile => {
      if (profile.username === null){
        profile.username = "New User"
      }
      this.setState({
        profile
      })
    })
  }

  // Each field has a button that affects the subsequent conditional render
  /*
  The image field does not yet have this functionality but will be added
  when Enrique solidifies file upload
  */
  render() {
    let {profile} = this.state
    const formAlign = {
      flexDirection: 'column',
      border: 'white solid 1px'
    }

    const backgroundImg = {
      display: 'flex',
      background: 'no-repeat center center scroll',
      backgroundSize: 'cover',
      backgroundColor:'black',
      height: '100%'
    }

    return (


        <div className="dashBoardBody main">

          <div className= "dashboard-section-container">
            <p className="welcome-text" >WELCOME, {`${this.state.profile.username}`}</p>

            {profile.following ? <TipFeed className="tipFeed" userId={this.props.userId} following={profile.following} /> : <p children="Tips of users you follow will appear here" /> }

          </div>
        </div>
    );
  }
}

export default withAuth(userDashboard);
