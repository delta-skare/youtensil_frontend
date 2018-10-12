import React, { Component } from 'react';
// import Tip from './Tip'

// import SideImage from '../images/eggnog-blossoms.jpeg'
import '../css/tipFeed.css'
import { getFollowingTips, getTips } from '../services/TipService'
import FollowButton from './FollowButton'
import { /*Row, Container, Col,*/ ListGroup, ListGroupItem } from 'reactstrap'

class TipFeed extends Component {
  constructor(props){
    super(props)
    this.state = {
      tips: []
    }
  }

  componentDidMount() {
    if(this.props.following !== undefined) {
      let followNumbers = this.props.following.split(",").map(number=>{
        return Number(number)
      })
      console.log(followNumbers)
      console.log(typeof followNumbers[1])
      getFollowingTips(followNumbers)
      .then(tips=> {
        this.setState({ tips })
      })
    } else {
      getTips()
      .then(tips=> {
        this.setState({ tips })
      })
    }
  }

  render() {
    let { tips } = this.state
    let tipList = tips.map(tip => {
      return (
        <ListGroupItem key={tip.id} className="tip-container">

          {/* ---------image container ---------- */}
          <div className="image-container">
            <img className="image" src={tip.image}/>
          </div>

          {/* --------- info container ---------- */}
          <div className="info-container">
            <div className="top-info">
              <p style={{border:"solid pink 1px", marginTop:"13px"}}>{this.props.username}</p>
              <button>Follow</button>
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
      )
    })

    return (

      <div>
          <ListGroup className="listGroup-container">
          {/* --------- tip container ---------- */}
            {tipList}
          </ListGroup>

      </div>
    );
  }
}

export default TipFeed;
