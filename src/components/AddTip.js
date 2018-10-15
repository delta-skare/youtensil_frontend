import React, { Component } from 'react';
import ImageUploader from './ImageUploader';
import { createTip } from '../services/TipService'
import withAuth from './withAuth'
import '../css/TwoThird.css';
import TipImg from '../images/artur-rutkowski-61567-unsplash.jpg'
import { Container, Row, Col } from 'reactstrap';


class AddTip extends Component {
  constructor(){
    super()
    this.state={
      description: '',
      user_id: 0
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleImage = (url) => {
    let tip = {...this.state}
    tip.image = url
    tip.restaurant = this.props.restaurant
    tip.food_types = this.props.categories
    tip.user_id = this.props.userId
    console.log(tip)
    createTip(tip)
    .then(res =>{
      alert('Tip uploaded successfully')
      this.props.history.replace('/dashboard')
      console.log(res)
    })
    .catch(err =>{ alert(err) })
  }

  render() {
    console.log(this.props)
    return (
      <Container fluid className="main">
        <Row>
          <Col sm="8">
              <form className="two-third-form-region">
                <h2>
                  {this.props.restaurant}
                </h2>
                <h3>
                  Tip Description
                </h3>
                <textarea
                  className="two-third-form-item"
                  placeholder="Description"
                  name="description"
                  type="text"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.description}
                />
              </form>
              <ImageUploader location="tip-images" handleImage={this.handleImage} className="two-third-form-region" />
          </Col>
          <Col sm="4">
            <img src={TipImg} className="side-image" alt="flavor"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(AddTip);
