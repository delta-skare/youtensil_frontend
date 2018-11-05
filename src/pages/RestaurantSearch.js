import React, {Component} from 'react';
import '../css/TwoThird.css';
import RestaurantList from "../components/RestaurantList";
import withAuth from "../components/withAuth";
import {Button, Col, Row} from "reactstrap";

class RestaurantSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "",
            location: "",
            results: [],
            form: false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    toggleForm = () => {
        this.setState({form: true})
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
        return (

            <div style={{paddingTop: '50px', height: `${this.state.form ? 'auto' : '96vh'}`}} className="main">
                <form onSubmit={this.handleFormSubmit} className="two-third-form-region">
                    <Row form style={{width: '100%'}}>
                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <Col>
                                <label>
                                    <p children={'Search for your restaurant:'}/>
                                </label>
                                <input type="text" name="term" placeholder="e.g. fish, Hodad's"
                                       onChange={this.handleChange}
                                       className="two-third-form-item"/>
                            </Col>

                            <Col>
                                <label>
                                    <p>Where are you?</p>
                                </label>

                                <input type="text" name="location" placeholder="e.g. San Diego, NY, 503 J st."
                                       onChange={this.handleChange} className="two-third-form-item"/>
                            </Col>
                            <Col style={{alignSelf: 'center'}}>
                                <Button type="submit" >Submit</Button>
                            </Col>
                        </div>
                    </Row>
                </form>

                <RestaurantList form={this.state.form} history={this.props.history} toggleForm={this.toggleForm}
                                restaurants={this.state.results}/>

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
