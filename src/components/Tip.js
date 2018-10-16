import React, { Component } from 'react';
import '../css/Full.css'
import { getTip } from '../services/TipService'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import { Button } from 'reactstrap'
import { /*Row, Container, Col,*/ ListGroup, ListGroupItem } from 'reactstrap'
import { getOrMakeProfileByUserId as getProfile } from '../services/ProfileService.js'

class Tip extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: ""
    }
  }

  componentDidMount() {
    getProfile(this.props.tip.user_id)
    .then(profile=> {
      this.setState({username: profile.username})
    })
  }

  render() {
    let {  username } = this.state
    let { userId, tip } = this.props
    tip.user_id = tip.user_id.toString()
    let edit = (
      <Link to={`/tips/${tip.id}/edit`} style={{color:'black', textDecoration:'none'}}>
        <Button>Edit Tip</Button>
      </Link>
    )
    return (
      <ListGroupItem key={tip.id} className="tip-container main">

        {/* ---------image container ---------- */}
        <div className="image-container">
          <img className="image" src={tip.image}/>
        </div>

        {/* --------- info container ---------- */}
        <div className="info-container">
          <div className="top-info">
            <p style={{border:"solid pink 1px", marginTop:"13px"}}>{username}</p>
            { userId === tip.user_id ? edit : <FollowButton followUserId={tip.user_id} followText={"Tip Author"} /> }
          </div>

          <div className="middle-info">
            <h4>{tip.restaurant}</h4>
            <p>{tip.food_types}</p>
          </div>

          <div className="bottom-info">
            <p>{tip.description}</p>
          </div>

        </div>
      </ListGroupItem>
    );
  }
}

export default Tip;
