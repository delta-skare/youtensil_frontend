import React, { Component } from 'react';
import '../css/Full.css'
import { getTip } from '../services/TipService'
import { Link } from 'react-router-dom'

class Tip extends Component {
  constructor(props){
    super(props)
    this.state = {
      tip: {}
    }
  }

  componentDidMount() {
    let userId = parseInt(this.props.userId, 10)
    getTip(this.props.id)
    .then(res => {
      this.setState({tip: res, userId})
    })
  }

  render() {
    let { tip, userId } = this.state
    let edit = (<Link to={`/tips/${this.props.id}/edit`} style={{color:'black'}}>Edit Tip</Link>)
    return (
      <div>
        <div className="tipcard">
            <h2>{tip.restaurant}</h2>
                <img src={tip.image}/>
            <h2>Tip Description</h2>
                <p>{tip.description}</p>
            <h3>Tip Category</h3>
                <p>{tip.food_types}</p>
            { userId === tip.user_id && edit }
        </div>

      </div>
    );
  }
}

export default Tip;
