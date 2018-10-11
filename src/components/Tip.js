import React, { Component } from 'react';
import '../css/Full.css'
import { getTip } from '../services/TipService'
import { Link } from 'react-router-dom'
import FollowButton from './FollowButton'
import { Button } from 'reactstrap'

class Tip extends Component {
  constructor(props){
    super(props)
    this.state = {
      tip: {}
    }
  }

  // This gets the tip with the desired Id
  // The tip's user_id is set to string to work with FollowButton and showing edit button
  componentDidMount() {
    getTip(this.props.tipId)
    .then(res => {
      res.user_id = res.user_id.toString()
      this.setState({tip: res})
    })
  }

  render() {
    let { tip } = this.state
    let { userId } = this.props
    let edit = (
      <Link to={`/tips/${this.props.tipId}/edit`} style={{color:'black', textDecoration:'none'}}>
        <Button>Edit Tip</Button>
      </Link>
    )
    return (
      <div>
        <div className="tipcard">
          <h1>{tip.restaurant}</h1>
            <img src={tip.image}/>
          <h2>Tip Description</h2>
            <p>{tip.description}</p>
          { userId === tip.user_id ? edit : <FollowButton followUserId={tip.user_id} followText={"tip author"} /> }
        </div>
      </div>
    );
  }
}

export default Tip;
