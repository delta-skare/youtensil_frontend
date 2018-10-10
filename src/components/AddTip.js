import React, { Component } from 'react';
import ImageUploader from './ImageUploader';
import { storage } from './firebase'
import { createTip } from '../services/TipService'
import withAuth from './withAuth'

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
    tip.food_types = this.props.categories.map(category=>{
      return category.title
    }).join(", ")
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
    console.log(this.state)
    return (
      <div>
      <form>
        <h2>
          {this.props.restaurant}
        </h2>
        <h3>
          Tip Description
        </h3>
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

export default withAuth(AddTip);
