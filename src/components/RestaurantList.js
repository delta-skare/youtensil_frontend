import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AddTip from './AddTip'

// Put this inside Search form
class RestaurantList extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      categories: []
    }
  }
  handleSelect = (restaurant) => (e) => {
    e.preventDefault()
    this.setState({
      name: restaurant.name,
      categories: restaurant.categories
    }, this.props.toggleForm())
  }

  render() {
    let { name, categories } = this.state
    let { restaurants, form } = this.props
    let restaurantOptions

    if (restaurants.length === 0) {
      restaurantOptions = <p children="The results of your search will replace me!" />
    } else {
      restaurantOptions = restaurants.map(restaurant => {
      return (
        <React.Fragment><Link key={restaurant.id} style={{color:'black'}} onClick={this.handleSelect(restaurant)} to=''>{`${restaurant.name}: ${restaurant.location.display_address.join(", ")}`}</Link><br/></React.Fragment>
      )
    })}

    return(
    <div>
      {form === true ? <AddTip restaurant={name} history={this.props.history} categories={categories} /> : restaurantOptions}
    </div>
    )
  }
}

export default RestaurantList
