import React, { Component } from 'react';
import { getProfiles } from '../services/ProfileService.js'
import { Link } from 'react-router-dom'
import '../css/Feed.css'
import { Container, Row, Col } from 'reactstrap';


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
        <Col style={{margin:"3rem"}} sm="3">
          <Link to={`user/${profile.id}`}>
            <div col-lg-6 className="item">
              <h1 children={profile.username} />
              <p children={profile.food_types} />
              <img src={profile.image} />
            </div>
          </Link>
        </Col>
      )
    })
    return (
      <div className="userFeedBackground">
        <Container>
          <Row>
           {profileCards}
          </Row>
        </Container>
      </div>

    );
  }
}

export default UserProfileFeed;
