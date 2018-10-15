import React, { Component } from 'react';
import { getUserTips } from '../services/TipService.js'
import { getOrMakeProfileByUserId as getProfile } from '../services/ProfileService.js'
import Tip from './Tip'
import FollowButton from './FollowButton'
import AuthService from '../services/AuthService.js'
import '../css/Full.css'
import { Container, Row, Col } from 'reactstrap';


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
      userId = this.auth.getUserId().toString()
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
      return <Tip key={tip.id} tipId={tip.id} userId={userId}/>
    })
    return (

        <Container fluid className="user-profile-body text-center">
        <h1 children={`${profile.username}'s Profile`} />
          <div className="upper-container">
            <div className="profile-image-container">
              <img src={profile.image} alt={`${profile.username}'s avatar'`}/>
            </div>
                <div className="about-section">
                  <h2 children={`About ${profile.username}`} />
                  <p children={profile.bio} />
                  <FollowButton followText={"This Profile"} followUserId={this.props.match.params.userId} className="follow-button"/>
            </div>


          </div>
          <h1 children={`How ${profile.username} eats better:`} />
            <div className="profile-tipList">
              {tipList}
            </div>

        </Container>

    );
  }
}

export default userProfile;
