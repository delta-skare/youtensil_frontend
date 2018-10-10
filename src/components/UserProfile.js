import React, { Component } from 'react';
import { getUserTips } from '../services/TipService.js'
import { getOrMakeProfileByUserId as getProfile } from '../services/ProfileService.js'
import Tip from './Tip'
import AuthService from '../services/AuthService.js'

class userProfile extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      tips: [],
      userId: 0,
      profile: {}
    }
  }

  // This takes the user ID of the profile page's owner and gets their tips
  componentDidMount() {
    let userId
    if(this.auth.loggedIn())
      userId = this.auth.getUserId()
    getProfile(this.props.match.params.userId)
    .then(profile=> {
      getUserTips(this.props.match.params.userId)
      .then(res=> {
        console.log(res)
        this.setState({ tips: res, userId, profile})
      })
    })
  }

  render() {
    let { tips, userId, profile } = this.state
    let tipList = tips.map(tip => {
      return <Tip key={tip.id} id={tip.id} userId={userId}/>
    })
    return (
      <div>
        <h1 children={`${profile.username}'s Profile`} />
        <img src={profile.image} />
        <h2 children={`About ${profile.username}`} />
        <p children={profile.bio} />
        <h1 children={`How ${profile.username} eats better:`} />
        {tipList}
      </div>
    );
  }
}

export default userProfile;
