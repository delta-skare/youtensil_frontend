import React, {Component} from 'react';
import {getProfiles} from '../services/ProfileService.js'
import {Link} from 'react-router-dom'
import '../css/Full.css'
import silhouette from '../images/woman-silhouette.jpg'
import {Container, Row, Col, CardImg, Card, CardLink, CardBody} from 'reactstrap';


class UserProfileFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profiles: []
        }
    }

    componentDidMount() {
        getProfiles()
            .then(profiles => {
                this.setState({profiles})
            })
    }

    render() {
        let {profiles} = this.state
        let profileCards = profiles.map(profile => {
            return (

                <Col key={profile.id} sm="4">

                    <Link to={`user/${profile.id}`}>

                        <Card body className="text-left" style={{margin: '10px 0'}}>
                            <CardBody>
                                <CardLink href={`user/${profile.id}`}>{profile.username || `User ${profile.id}`}</CardLink>
                            </CardBody>
                            <div className="card-image-container">
                                <CardImg bottom width="100%" src={profile.image || silhouette} alt={`${profile.username || `User ${profile.id}`}'s avatar`}/>
                            </div>
                        </Card>
                    </Link>
                </Col>
            )
        })


        return (
            <div className="userFeedBackground main">
                <Container>
                    <Row>
                        {profileCards}
                    </Row>
                </Container>
            </div>

        );
    }
}

export default UserProfileFeed;
