import React, { Component } from 'react'
import AddTip from './AddTip'
import '../css/Full.css'

// Put this inside Search form
class RestaurantList extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      categories: ""
    }
  }
  handleSelect = (e) => {
    e.preventDefault()
    let restaurantDetails = e.target.value.split(":")
    let name = restaurantDetails[0]
    let categories = restaurantDetails[1]
    this.setState({
      name, categories
    }, this.props.toggleForm())
  }

  render() {
    let { name, categories } = this.state
    let { restaurants, form } = this.props
    let restaurantOptions

    if (restaurants.length === 0) {
      restaurantOptions = <p children="The results of your search will replace me!" />
    } else {
      restaurantOptions = (
        <select
          onChange={this.handleSelect}
          name="email"
          type="text"
          value={this.state.restaurant}
        >
          {
            restaurants.map(restaurant => {
              return (
                <option
                  key={restaurant.id}
                  value={`${restaurant.name}:${restaurant.categories.map(category=>{
                    return category.title
                  }).join(", ")}`}
                  children={`${restaurant.name}: ${restaurant.location.display_address.join(", ")}`}
                />
              )
            })
          }
        </select>
      )
    }

    return(

      <div className="restList">

        {form === true ? <AddTip restaurant={name} history={this.props.history} categories={categories} /> : restaurantOptions}

      </div>
    )
  }
}

export default RestaurantList
