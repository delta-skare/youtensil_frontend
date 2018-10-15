import React, { Component } from 'react';
import { getProfiles } from '../services/ProfileService.js'
import { Link } from 'react-router-dom'
import '../css/Full.css'
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

        <Col key={profile.id} sm="3" className="team">

          <Link to={`user/${profile.id}`}>

            <div className="team">

              <h1 children={profile.username} />
              <p children={profile.food_types} />
              <img className="profile-image" src={profile.image} alt={`${profile.username}'s avatar`}/>
            </div>
          </Link>
        </Col>
      )
    })


    return (
      <div className="userFeedBackground main">
        <Container fluid>
          <Row className="team-row">
           {profileCards}
          </Row>
        </Container>
      </div>

    );
  }
}

export default UserProfileFeed;
