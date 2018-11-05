import React, {Component} from 'react'
import AddTip from './AddTip'
import '../css/Full.css'

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
        this.setState({
            name, categories, imageUrl
        }, this.props.toggleForm())
    }

    render() {
        let {name, categories, imageUrl} = this.state
        let {restaurants, form} = this.props
        let restaurantOptions

        if (restaurants.length === 0) {
            restaurantOptions = <p children="The results of your search will replace me!"/>
        } else {
            restaurantOptions = (
                <select
                    onChange={this.handleSelect}
                    name="email"
                    value={this.state.restaurant}
                >
                    <option hidden disabled selected value children={'Select a restaurant'}/>
                    {
                        restaurants.map(restaurant => {
                            return (
                                <option
                                    className="main"
                                    key={restaurant.id}
                                    value={`${restaurant.name}~${restaurant.categories.map(category => {
                                        return category.title
                                    }).join(", ")}~${restaurant.image_url}`}
                                    children={`${restaurant.name}: ${restaurant.location.display_address.join(", ")}`}
                                />
                            )
                        })
                    }
                </select>
            )
        }

        return (

            <div className="restList">

                {form === true ? <AddTip restaurant={name} history={this.props.history} imageUrl={imageUrl}
                                         categories={categories}/> : restaurantOptions}

            </div>
        )
    }
}

export default RestaurantList
