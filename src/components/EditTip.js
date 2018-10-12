import React, { Component } from 'react';
import '../css/TwoThird.css';
import { editTip, getTip } from '../services/TipService.js'
import ImageUploader from './ImageUploader'
import withAuth from './withAuth.js'
import { Container, Row, Col } from 'reactstrap';
import editTipImg from '../images/vitchakorn-koonyosying-494170-unsplash.jpg'




class EditTip extends Component {
  constructor(){
    super()
    this.state={
      currentTip: {},
      tip: {},
      form: {
        restaurant: false,
        description: false,
        image: false,
        food_types: false
      }
    }
  }

  componentDidMount() {
    getTip(this.props.match.params.id)
    .then(tip => {
      this.setState({
        tip,
        currentTip: {...tip}
      })
    })
  }

  toggleFormField = (field) => (e) => {
    e.preventDefault()

    let { form } = this.state
    form[field] = !form[field]
    this.setState({ form })
  }

  handleChange = (e) => {
    let { tip } = this.state
    tip[e.target.name] = e.target.value
    this.setState({ tip })
  }

  handleImage = (url) => {
    let {currentTip} = this.state
    let submission = {tip: { image: url}}
    editTip(this.props.match.params.id, submission)
    .then(res =>{
      currentTip.image = url
      this.setState({ currentTip })
      console.log(res)
    })
    .catch(err =>{ alert('Something went wrong. Please make sure all fields are filled with the appropriate information and try again.') })
  }

  handleSubmit = (parameter) => (e) => {
    e.preventDefault()
    let { tip, currentTip } = this.state
    let submission = { tip: {[parameter]: tip[parameter]} }
    editTip(this.props.match.params.id, submission)
    .then(res =>{
      currentTip[parameter] = tip[parameter]
      this.setState({ currentTip })
    })
  }

  // This creates the appropriate form field with proper inputs inside
  createFormField = (parameter) => {
    return (
      <form onSubmit={this.handleSubmit(parameter)}>
        {this._createInput(parameter)}
        <input
          className="form-submit"
          value="SUBMIT"
          type="submit"
        />
      </form>
    )
  }

  // This creates the appropriate inputs for a given form
  _createInput = (parameter) => {
    let placeholder
    let input = "input"
      return (
        <textarea
        className = "form-item"
        name = {parameter}
        type = "text"
        onChange = {this.handleChange}
        value = {this.state.tip[parameter]}
        />
      )
    }

  render() {
    let { form, currentTip } = this.state
    console.log(this.state)
    return (
      <Container>
        <Row>
          <Col sm="8">
            <h1>Edit Tip</h1>
              <div><img src={this.state.currentTip.image} alt="Your avatar"/></div>
            <button onClick={this.toggleFormField("image")}>Edit Image</button>
              {form.image && <ImageUploader location="tip-images" handleImage={this.handleImage} />}
            <h2>Restaurant</h2>
              <p>{currentTip.restaurant}</p>
            <h3>Description</h3>
              <p>{currentTip.description}</p>
            <button onClick={this.toggleFormField("description")}>Edit Description</button>
              {form.description && this.createFormField("description")}
          </Col>
          <Col sm="4">
            <img src={editTipImg} className="side-image"/>
          </Col>
        </Row>
      </Container>
      

    );
  }
}

export default withAuth(EditTip);
