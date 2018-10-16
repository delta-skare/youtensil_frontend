import React, { Component } from 'react';
import '../css/tipFeed.css'
import { getFollowingTips, getTips } from '../services/TipService'
import FollowButton from './FollowButton'
import Tip from './Tip'
import { ListGroup, ListGroupItem } from 'reactstrap'

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
    let { userId } = this.props
    let tipList = tips.map(tip => {
      return <Tip key={tip.id} tip={tip} userId={userId}/>
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
