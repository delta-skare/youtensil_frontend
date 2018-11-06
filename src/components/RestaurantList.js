import React, {Component} from 'react'
import AddTip from './AddTip'
import '../css/Full.css'
import {Input} from "reactstrap";

// Put this inside Search form
class RestaurantList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            categories: "",
            imageUrl: "",
        }
    }

    handleSelect = (e) => {
        e.preventDefault()
        let restaurantDetails = e.target.value.split("~")
        let name = restaurantDetails[0]
        let categories = restaurantDetails[1]
        let imageUrl = restaurantDetails[2] ? restaurantDetails[2] : 'artur-rutkowski-61567-unsplash.jpg'
        this.props.toggleForm(name, categories, imageUrl)
    }

    render() {
        let {name, categories, imageUrl} = this.state
        let {restaurants, form} = this.props
        let restaurantOptions

        if (!restaurants.length) {
            restaurantOptions = <option disabled selected>The results of your search will appear here!</option>
        } else {
            restaurantOptions = (
                    <React.Fragment>
                    <option hidden disabled selected value children={'Select a restaurant'}/>
                    {
                        restaurants.map(restaurant => {
                            return (
                                <option
                                    key={restaurant.id}
                                    value={`${restaurant.name}~${restaurant.categories.map(category => {
                                        return category.title
                                    }).join(", ")}~${restaurant.image_url}`}
                                    children={`${restaurant.name}: ${restaurant.location.display_address.join(", ")}`}
                                />
                            )
                        })
                    }
                    </React.Fragment>
            )
        }

        return (
            <div className="restList">
                <Input
                    type="select"
                    onChange={this.handleSelect}
                    name="email"
                    value={this.state.restaurant}
                    style={{maxWidth: '580px'}}
                >
                {restaurantOptions}
                </Input>
            </div>
        )
    }
}

export default RestaurantList
