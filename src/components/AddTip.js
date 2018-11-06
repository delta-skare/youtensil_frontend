import React, {Component} from 'react';
import ImageUploader from './ImageUploader';
import {createTip} from '../services/TipService'
import withAuth from './withAuth'
import '../css/TwoThird.css';
import {Container, Row, Col, Input} from 'reactstrap';


class AddTip extends Component {
    constructor() {
        super()
        this.state = {
            description: '',
        }
    }

    handleChange(e) {
        this.setState({description: e.target.value})
    }

    handleImage = (url) => {
        let tip = {...this.state}
        tip.image = url
        tip.restaurant = this.props.restaurant
        tip.food_types = this.props.categories
        tip.user_id = this.props.userId
        console.log(tip)
        createTip(tip)
            .then(res => {
                alert('Tip uploaded successfully')
                this.props.history.replace('/dashboard')
                console.log(res)
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        console.log(this.props)
        return (
            <Container fluid style={{overflowX: 'hidden'}}>
                <Row>
                    <Col sm="6">
                        <form className="add-tip-form">
                            <h2>
                                {this.props.restaurant}
                            </h2>
                            <h3>
                                Tip Description
                            </h3>
                            <Input
                                className="two-third-text-area"
                                name="description"
                                onChange={this.handleChange.bind(this)}
                                placeholder="Description"
                                type="textarea"
                                value={this.state.description}
                            />
                        </form>
                        <br/>
                        <ImageUploader location="tip-images" handleImage={this.handleImage}
                                       className="two-third-form-region"/>
                    </Col>
                    <Col sm="6">
                        <div >
                            <img src={this.props.imageUrl} className="side-image" alt="flavor"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withAuth(AddTip);
