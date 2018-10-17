import React, { Component } from 'react';
import '../css/tipFeed.css'
import { getTip } from '../services/TipService'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import { ListGroup, ListGroupItem, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'
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
        <Col sm="4">
          <Card tip={tip.id} style={{marginBottom:"20px"}} className="card">
          <header className="card-header" className="card-header">
          <Link to={`/user/${tip.user_id}`}>
            {username}
          </Link>
          { userId === tip.user_id ? edit : <FollowButton followUserId={tip.user_id} followText=""/> }
          </header>

          <div className="card-image-container">
            <CardImg top width="100%" src={tip.image} alt="Card image cap"/>
          </div>
            <CardBody style={{padding:"25px"}}>
              <CardTitle size="sm">{tip.restaurant}</CardTitle>
              <CardSubtitle style={{color:"#E88126"}}>{tip.food_types}</CardSubtitle>

              <CardText style={{marginTop:"8px", color:"#5A5959"}}>{tip.description}</CardText>
            </CardBody>
          </Card>
        </Col>
    );
  }
}

export default Tip;
