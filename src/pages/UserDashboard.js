import React, {Component} from 'react';
import withAuth from '../components/withAuth'
import AuthService from '../services/AuthService'
import TipFeed from '../components/TipFeed'
import {getOrMakeProfileByUserId as getProfile} from '../services/ProfileService'
import '../css/dashboard.css'
import {getFollowingTips} from "../services/TipService";


class userDashboard extends Component {
    constructor(props) {
        super(props)
        this.Auth = new AuthService()
        this.state = {
            // Information will get stored here on render and is what the user sees
            currentProfile: {},
            // These two objects are updated from form inputs
            // Profile is also filled on render
            // user.current_password_email exists to not have value repetition in input forms
            profile: {},
            user: {
                email: "",
                password: "",
                password_confirmation: "",
                current_password: "",
                current_password_email: ""
            },
            // This object is used to toggle viewability of form fields
            form: {
                username: false,
                food_types: false,
                password: false,
                bio: false,
                image: false,
                email: false
            },
            tips: {}
        }
    }

    // This gets the current user's profile data on render and sets state
    // Need to figure out how to get email from devise
    componentDidMount() {
        getProfile(this.props.userId)
            .then(profile => {
                if (profile.username === null) {
                    profile.username = "New User"
                }
                // this.setState({
                //   profile
                // })
                return profile
            })
            .then((profile) => {
                if (profile.following !== undefined) {
                    let followNumbers = profile.following.split(",").map(number => {
                        return Number(number)
                    })
                    getFollowingTips(followNumbers)
                        .then(tips => {
                            this.setState({tips, profile})
                        })
                }
            })

    }

    // Each field has a button that affects the subsequent conditional render
    /*
    The image field does not yet have this functionality but will be added
    when Enrique solidifies file upload
    */
    render() {
        let {profile, tips} = this.state

        return (

            <div className="dashBoardBody">

                <div className="dashboard-background-image"></div>

                <div className="background-animation"></div>


                <div className="dashboard-section-container">
                    <p className="welcome-text">WELCOME, {`${profile.username}`}</p>


                    {profile.following ?
                        <TipFeed className="tipFeed" userId={this.props.userId} tips={tips}/> :
                        <p children="Tips of users you follow will appear here"/>}

                </div>

            </div>
        );
    }
}

export default withAuth(userDashboard);
