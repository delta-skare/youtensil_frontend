import React, { Component } from 'react';
import ImageUploader from './ImageUploader';
import { storage } from './firebase'
import { createTip } from '../services/TipService'
import withAuth from './withAuth'

class addTip extends Component {
  constructor(){
    super()
    this.state={
      image: '',
      restaurant: '',
      description: '',
      food_types: '',
      user_id: 0
    }
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleImage = (url) => {
    let tip = {...this.state}
    tip.image = url
    tip.user_id = this.props.userId
    createTip(tip)
    .then(res =>{

      console.log(res)
    })
    .catch(err =>{ alert('Something went wrong. Please make sure all fields are filled with the appropriate information and try again.') })
  }

  // handleFormSubmit(e){
  //   e.preventDefault()
  //   let { tip } = this.state
  //   tip.user_id = this.props.userId
  //   createTip({tip: tip})
  //   .then(res =>{
  //     this.props.history.replace('/dashboard')
  //   })
  //   .catch(err =>{ alert('Something went wrong. Please make sure all fields are filled with the appropriate information and try again.') })
  // }

  render() {
    console.log(this.state)
    return (
      <div>
      <form>
        <input
          className="form-item"
          placeholder="Restaurant name"
          name="restaurant"
          type="text"
          onChange={this.handleChange.bind(this)}
          value={this.state.restaurant}
        />
        <input
          className="form-item"
          placeholder="Types of food"
          name="food_types"
          type="text"
          onChange={this.handleChange.bind(this)}
          value={this.state.food_types}
        />
        <textarea
          className="form-item"
          placeholder="Description"
          name="description"
          type="text"
          onChange={this.handleChange.bind(this)}
          value={this.state.description}
        />
      </form>
      <ImageUploader location="tip-images" handleImage={this.handleImage} />
      </div>
    );
  }
}

export default withAuth(addTip);
