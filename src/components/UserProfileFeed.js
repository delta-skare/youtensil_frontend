import React, { Component } from 'react';
import { getProfiles } from '../services/ProfileService.js'
import '../css/Feed.css'

class UserProfileFeed extends Component {
  constructor(props){
    super(props)
    this.state = {
      profiles: []
    }
  }

  componentDidMount() {
    getProfiles()
    .then(profiles=>{
      this.setState({profiles})
    })
  }

  render() {
    let { profiles } = this.state
    let profileCards = profiles.map(profile=>{
      return (
        <div col-lg-6 className="item">
          <h1 children={profile.username} />
          <p children={profile.food_types} />
          <img src={profile.image} />
        </div>
      )
    })
    return (
      <div className="userFeedBackground">
        <div className="container row">
          {profileCards}
        </div>
      </div>

    );
  }
}

export default UserProfileFeed;
