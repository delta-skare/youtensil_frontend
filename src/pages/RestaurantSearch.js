import React, {Component} from 'react';
import '../css/TwoThird.css';
import RestaurantList from "../components/RestaurantList";
import withAuth from "../components/withAuth";
import {Button, Col, Container, Input, Row} from "reactstrap";
import AddTip from "../components/AddTip";

class RestaurantSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            location: "",
            results: [],
            form: false,
            name: "",
            categories: "",
            imageUrl: "",
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    toggleForm = (name, categories, imageUrl) => {
        this.setState({form: true, name, categories, imageUrl})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.term, this.state.location)
        let {term, location} = this.state
        search(term, location)
            .then(res => {
                if (res === null) return alert('Please ensure fields are properly filled.')
                this.setState({results: res, form: false})
            })
    }

    render() {
        let {name, categories, imageUrl} = this.state
        return (

            <div style={{paddingTop: '50px', height: `${this.state.form ? 'auto' : '96vh'}`}} className="main">
                <div className="restContainer">
                    <form onSubmit={this.handleFormSubmit} className="two-third-form-region" style={{height: '80px'}}>
                        <div className="restForm"
                             style={{display: 'flex', justifyContent: 'flex-start', wrap: 'nowrap', height: '80px'}}>
                            <div>
                                <label>
                                    Search for your restaurant:
                                </label>
                                <Input type="text" name="term" placeholder="e.g. fish, Cheesecake Factory"
                                       onChange={this.handleChange} style={{width: '290px', marginBottom: '15px'}}/>
                            </div>

                            <div>
                                <label>
                                    Where are you?
                                </label>

                                <Input type="text" name="location" placeholder="e.g. San Diego, NY, 503 J St."
                                       onChange={this.handleChange} style={{width: '290px'}}/>
                            </div>
                            <div className="restButton">
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>

                    <RestaurantList form={this.state.form} history={this.props.history}
                                    toggleForm={this.toggleForm} restaurants={this.state.results}/>
                </div>
                <div>
                    {this.state.form && <AddTip restaurant={name} history={this.props.history} imageUrl={imageUrl}
                                                categories={categories}/>}
                </div>
            </div>
        );
    }
}

const base = process.env.REACT_APP_API_URL
let search = (term, location) => {
    console.log("preparing yelp search"
    )
    return fetch(base + '/search', {
        body: JSON.stringify({term: term, location: location}),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(resp => {
            let json = resp.json()
            console.log(json)
            return json
        })

}
export default withAuth(RestaurantSearch)
