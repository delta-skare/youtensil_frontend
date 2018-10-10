import React, { Component } from 'react';
import { getUserTips } from '../services/TipService.js'
import Tip from './Tip'
import AuthService from '../services/AuthService.js'

class userProfile extends Component {
  constructor(props){
    super(props)
    this.auth = new AuthService()
    this.state = {
      tips: [],
      userId: 0
    }
  }

  // This takes the user ID of the profile page's owner and gets their tips
  componentDidMount() {
    if(this.auth.loggedIn())
      this.state.userId = this.auth.getUserId()
    getUserTips(this.props.match.params.userId)
    .then(res=> {
      console.log(res)
      this.setState({ tips: res})
    })
  }

  render() {
    let { tips, userId } = this.state
    let tipList = tips.map(tip => {
      return <Tip key={tip.id} id={tip.id} userId={userId}/>
    })
    return (
      <div>
        <h1>Profile</h1>
        {tipList}
      </div>
    );
  }
}

export default userProfile;
