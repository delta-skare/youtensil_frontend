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

  componentDidMount() {
    if(this.auth.loggedIn())
      this.state.userId = this.auth.getUserId()
    getUserTips(this.props.match.params.id)
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
        <div>
          <h1>Profile</h1>
            <p>Username</p>
            <img src="./images/woman-silhoutte.jpg"/>
            <h2>Favorite Cuisines</h2>
                <p>Italian, and Indian</p>
            <h3>About</h3>
                <p>I mountain bike and work at The Andaz Hotel in downtown San Diego.</p>
        </div>
        {tipList}
      </div>
    );
  }
}

export default userProfile;
