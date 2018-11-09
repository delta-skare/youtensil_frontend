import React, {Component} from 'react';
import {getUserTips} from '../services/TipService.js'
import {getOrMakeProfileByUserId as getProfile, editProfile} from '../services/ProfileService.js'
import Tip from '../components/Tip'
import ImageUploader from '../components/ImageUploader'
import FollowButton from '../components/FollowButton'
import AuthService from '../services/AuthService.js'
import silhouette from '../images/woman-silhouette.jpg'
import '../css/Full.css'
import {Button, CardColumns} from 'reactstrap'
// import {Container, Row, Col} from 'reactstrap';

class userProfile extends Component {
    constructor(props) {
        super(props)
        this.auth = new AuthService()
        this.state = {
            tips: [],
            userId: 0,
            profile: {},
            currentProfile: {},
            user: {
                email: "",
                password: "",
                password_confirmation: "",
                current_password: "",
                current_password_email: ""
            },
            form: {
                username: false,
                food_types: false,
                password: false,
                bio: false,
                image: false,
                email: false
            }
        }
    }

    // This takes the user ID of the profile page's owner and gets their tips
    componentDidMount() {
        let userId
        if (this.auth.loggedIn())
            userId = this.auth.getUserId().toString()
        getProfile(this.props.match.params.userId)
            .then(profile => {
                if (profile.username === null) {
                    profile.username = "Set Username"
                }
                profile.user_id = profile.user_id.toString()
                getUserTips(this.props.match.params.userId)
                    .then(res => {
                        console.log(res)
                        this.setState({
                            tips: res,
                            userId,
                            profile,
                            currentProfile: {...profile}
                        })
                    })
            })
    }

    // This updates the appropriate state object on input change
    // NOTE: Getting react errors here, need to check with instructors
    handleChange = (model) => (e) => {
        e.preventDefault()
        // eslint-disable-next-line no-unused-vars
        let {profile, user} = Object.assign({}, this.state)

        // eslint-disable-next-line no-unexpected-multiline
            [model][e.target.name] = e.target.value
        this.setState({model})
    }

    // This uploads the image url to our database
    handleImage = (url) => {
        let {profile, currentProfile, form} = this.state
        editProfile(profile.id, {profile: {image: url}})
            .then(res => {
                currentProfile.image = profile.image = url
                form.image = false
                this.setState({currentProfile, profile, form})
            })
    }

    // This toggles the appropriate form field to appear
    toggleFormField = (field) => (e) => {
        e.preventDefault()

        let {form} = this.state
        form[field] = !form[field]
        this.setState({form})
    }

    // This performs the appropriate fetch call on submit
    handleSubmit = (parameter) => (e) => {
        e.preventDefault()
        let {profile, user, form} = this.state

        // Profile form fields
        // NOTE: Need to find a way to notify that a username is already taken
        if (parameter === "food_types" || parameter === "username" || parameter === "bio") {
            editProfile(profile.id, profile)
                .then(res => {
                    form[parameter] = false
                    this.setState({currentProfile: {...profile}, form})
                })
                .catch(err => {
                    alert(err)
                })
        } else {

            // For email, ensure password fields are blank
            if (parameter === "email") {
                user.current_password = user.current_password_email
                user.password = user.password_confirmation = user.current_password_email = undefined

                // For password, ensure email fields are blank
            } else if (parameter === "password") {
                user.email = user.current_password_email = undefined
            }
            this.Auth.updateUser({user: user})
            /*
            The way the AuthService fetch is written combined with the way Devise is written,
            a syntax error will occur on successful email and password updates, due to the
            response being a status 204. The following code handles that and ensures users do
            not notice an error occured.
            They will still get alerted if password verification was done incorrectly.
            */
                .then(res => {
                    user.email = user.current_password_email = user.password = user.password_confirmation = user.current_password = ""
                    if (res.includes("SyntaxError: Unexpected end of JSON input")) {
                        form[parameter] = false
                        this.setState({user, form}, alert('Account updated successfully'))
                    } else {
                        this.setState({user}, alert('Double check input accuracy and try again'))
                    }
                })
                // Not sure if necessary to be honest since I added a catch to AuthService's fetch
                .catch(err => {
                    alert(err)
                })
        }
    }

    // This creates the appropriate form field with proper inputs inside
    createFormField = (parameter) => {

        return (
            <form onSubmit={this.handleSubmit(parameter)}>
                {this._createInput(parameter)}
                {parameter === "password" && this._createInput("password_confirmation")}
                {parameter === "password" && this._createInput("current_password")}

                {parameter === "email" && this._createInput("current_password_email")}
                <input
                    className="btn"
                    value="SUBMIT"
                    type="submit"
                />
            </form>
        )
    }

    // This creates the appropriate inputs for a given form
    _createInput = (parameter) => {
        let type, stateObject, placeholder
        let input = "input"

        // Set variables for use later
        switch (parameter) {
            case "food_types":
            case "username":
            case "bio":
            default:
                stateObject = "profile"
                type = "text"
                break
            case "password":
            case "password_confirmation":
            case "current_password":
            case "current_password_email":
                stateObject = "user"
                type = "password"
                break
            case "email":
                stateObject = "user"
                type = "email"
                break
            case "image":
                stateObject = "profile"
                type = "file"
        }

        // Set further variables for use later
        if (parameter === "current_password" || parameter === "current_password_email") {
            placeholder = "Confirm current password"
        } else if (parameter === "password_confirmation") {
            placeholder = "Confirm new password"
        } else {
            placeholder = `Enter new ${parameter}`
        }

        // This is where those variables get put into play
        // The only difference between this and the else is input vs textarea
        // NOTE: Need to figure out if there is a better way to do this
        if (parameter === "bio" || parameter === "food_types") {
            return (
                <textarea
                    className="dashboard-form-item"
                    placeholder={placeholder}
                    name={parameter}
                    onChange={this.handleChange(stateObject)}
                    value={this.state[stateObject][parameter]}
                />
            )
        } else {
            return (
                <input
                    className="dashboard-form-item"
                    placeholder={placeholder}
                    name={parameter}
                    type={type}
                    onChange={this.handleChange(stateObject)}
                    value={this.state[stateObject][parameter]}
                />
            )
        }
    }

    render() {
        let {tips, userId, currentProfile, form} = this.state
        let tipList = tips.map(tip => {
            return <Tip key={tip.id} tip={tip} userId={userId}/>
        })
        return (


            <div className="main" style={{height: `${tips.length ? 'auto' : '96vh'}`}}>
            <div style={{
              display:"flex",
              justifyContent: "center"
            }}>
                {currentProfile.user_id === userId
                    ?
                    <div style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>

                        {/* -------------- USERNAME ------------------ */}
                        <div style={{alignSelf: 'center'}}>
                                <p>Click your avatar/text about yourself to edit</p>
                        </div>
                        {
                            form.username
                                ? this.createFormField("username")
                                : <h2 onClick={this.toggleFormField("username")} style={{display:"flex", justifyContent: "center"}}>
                                    {currentProfile.user_id === userId ? currentProfile.username : `${currentProfile.username}'s Profile`}
                                </h2>

                        }

                        {/* -------------- PROFILE IMAGE ------------------ */}

                        {
                            form.image
                              ? <div style={{alignSelf: 'center', width: '200px', display:"flex", justifyContent: "center", flexWrap: 'row'}}><ImageUploader toggle={() => {
                              form.image = false
                              this.setState({form})}
                              } location="profile-images" handleImage={this.handleImage}/></div>
                                : <div style={{display:"flex", justifyContent: "center"}}>
                                    <img className="profile-image" src={currentProfile.image || silhouette} alt="Your avatar" onClick={this.toggleFormField("image")}/>
                                </div>

                        }



                        {/* -------------- ABOUT ------------------ */}
                        {
                            form.bio
                                ? this.createFormField("bio")
                                : <p onClick={this.toggleFormField("bio")}>
                                    {currentProfile.bio}
                                </p>
                        }

                        {/* -------------- FAVORITE FOODS ------------------ */}
                        <h3 children={"Food categories of restaurants you'd like to see tips for:"}/>
                        {
                            form.food_types
                                ? this.createFormField("food_types")
                                : <p onClick={this.toggleFormField("food_types")}>
                                    {currentProfile.food_types}
                                </p>
                        }

                        {/* -------------- EMAIL ------------------ */}
                        <div style={{alignSelf: 'center'}}>
                        <Button onClick={this.toggleFormField("email")} style={{ width: '150px'}}>Edit Email</Button>
                        <div className="form-field">
                            {form.email && this.createFormField("email")}
                        </div>

                        {/* -------------- PASSWORD ------------------ */}
                        <Button style={{ width: '150px'}} onClick={this.toggleFormField("password")}>Edit Password</Button>
                        {form.password && this.createFormField("password")}
                        </div>
                    </div>
                    :
                    <div>
                        <h1 style={{display:"flex", justifyContent: "center", color: "white"}} children={`${currentProfile.username}'s Profile`}/>
                        <div style={{display:"flex", justifyContent: "center"}}>
                          <img className="profile-image" src={currentProfile.image} alt={`${currentProfile.username}'s avatar`}/>
                        </div>
                        <h2 style={{display:"flex", justifyContent: "center", color: "white"}} children={`${currentProfile.username}`}/>
                        <p style={{display:"flex", justifyContent: "center", color: "white"}} children={currentProfile.bio}/>
                        <div style={{display:"flex", justifyContent: "center", color: "white"}}>
                          <FollowButton followText={"This profile"} followUserId={this.props.match.params.userId}/>
                        </div>
                    </div>
                }
                </div>
                <h1 style={{display:"flex", marginTop: '20px', justifyContent: "center", color: "white"}} children={`How ${currentProfile.user_id === userId ? 'you eat' : currentProfile.username + ' eats'} better:`}/>
                <div style={{margin: "20px"}}>
                  <CardColumns>
                    {tipList}
                  </CardColumns>
                </div>
            </div>


        );
    }
}

export default userProfile;
