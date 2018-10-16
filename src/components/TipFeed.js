import React, { Component } from 'react';
import '../css/tipFeed.css'
import { getFollowingTips, getTips } from '../services/TipService'
import FollowButton from './FollowButton'
import { ListGroup, ListGroupItem, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col, CardDeck } from 'reactstrap'
import Tip from './Tip'


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

       //   <Col sm="4">
       //     <Card style={{marginBottom:"10px"}}>
       //       <CardImg src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
       //       <CardBody>
       //         <CardTitle>Card title</CardTitle>
       //         <CardSubtitle>Card subtitle</CardSubtitle>
       //         <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
       //         <Button>Button</Button>
       //       </CardBody>
       //     </Card>
       //   </Col>


    })

    return (
      <CardDeck>
        {tipList}
      </CardDeck>
    );
  }
}

export default TipFeed;
