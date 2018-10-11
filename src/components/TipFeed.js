import React, { Component } from 'react';
// import Tip from './Tip'
import '../css/Feed.css'
import { getFollowingTips } from '../services/TipService'
// import { getOrMakeProfileByUserId as getProfile } from '../services/ProfileService'

class tipFeed extends Component {
  constructor(props){
    super(props)
    this.state = {
      tips: []
    }
  }

  componentDidMount() {
    let followNumbers = this.props.following.split(",").map(number=>{
      return Number(number)
    })
    console.log(followNumbers)
    console.log(typeof followNumbers[1])
    getFollowingTips(followNumbers)
    .then(tips=> {
      this.setState({ tips })
    })
  }

  render() {
    let { tips } = this.state
    let tipList = tips.map(tip => {
      return (
        <div col-3 className="item">
          <h1>{tip.restaurant}</h1>
          <img src={tip.image} alt="delicious food" />
          <p>{tip.description}</p>
        </div>
      )
    })

    return (
      <div className="tipFeedBackground">
        <div className="container row">
          {tipList}
        </div>
      </div>
    );
  }
}

export default tipFeed;
