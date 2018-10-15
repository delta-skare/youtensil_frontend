import React, { Component } from 'react';
import '../css/TwoThird.css';
import RestaurantList from './RestaurantList'

// put this inside tip
class RestaurantSearch extends Component {
  constructor(props) {
    super(props);
      this.state = {
      term: "",
      location:"",
      results:[],
      form: false
    }
  }

  handleChange = (e) => {
     this.setState({ [e.target.name]: e.target.value })
  }

  toggleForm = () => {
    this.setState({form: true})
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.term, this.state.location)
    let {term, location} = this.state
    search(term, location)
    .then(res=>{
      console.log(res)
      this.setState({results: res, form: false})
    })
  }

  render() {
    return (
      <div style={{paddingTop: '50px'}} className="main">
        <form onSubmit={this.handleFormSubmit} className="two-third-form-region">
          <label>
            <p>Restuarant/Food Type?</p>
          </label>
          <input type="text" name="term" onChange={this.handleChange} placeholder="Ex. Dumplings" className="two-third-form-item"/>

          <label>
            <p>What City Are you In?</p>
          </label>
          <input type="text" name="location" onChange={this.handleChange} className="two-third-form-item"/>

          <input type="submit" value="Submit" className="two-third-form-submit"/>
        </form>

        <RestaurantList form={this.state.form} history={this.props.history} toggleForm={this.toggleForm} restaurants={this.state.results} />

      </div>
    );
  }
}

export default RestaurantSearch;

const base ='http://localhost:3001'
let search = (term, location) => {
    console.log("preparing yelp search"
    )
    return fetch(base + '/search', {
        body: JSON.stringify({term: term, location: location}),
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST'
      })
    .then(resp =>{
      let json = resp.json()
      console.log(json)
      return json
    })

}
