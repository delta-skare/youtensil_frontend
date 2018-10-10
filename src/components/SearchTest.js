import React, { Component } from 'react';
import '../css/TwoThird.css';


class SearchTest extends Component {
  constructor(props) {
    super(props);
      this.state = {
      term: "",
      location:"",
      results:[]
    }
  }

  handleChange = (e) => {
     this.setState({ [e.target.name]: e.target.value })

   }

   handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.term, this.state.location)
    let {term, location} = this.state
    search(term, location)
    .then(res=>{
      this.setState({results: res})
    })
  }

  render() {
    let resultList = this.state.results.map(result=>{
      return (
        <p>{result.name} {result.location.address1}, {result.location.city}, {result.location.state} {result.location.zip_code}</p>
      )
    })
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
            <label>
            <p>What's For Dinner?</p>
            </label>
          <input type="text" name="term" onChange={this.handleChange}/>
          <label>
          <p>What City Are you In?</p>
          </label>
          <input type="text" name="location" onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
      </form>
      {resultList}
    </div>
    );
  }
}

export default SearchTest;


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
