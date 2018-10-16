import React, { Component } from 'react';
import { getUserTips } from '../services/TipService.js'
import { getOrMakeProfileByUserId as getProfile, editProfile } from '../services/ProfileService.js'
import Tip from './Tip'
import ImageUploader from './ImageUploader'
import FollowButton from './FollowButton'
import AuthService from '../services/AuthService.js'
import '../css/Full.css'
import { Container, Row, Col } from 'reactstrap';

class userProfile extends Component {
  constructor(props){
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
    if(this.auth.loggedIn())
      userId = this.auth.getUserId().toString()
    getProfile(this.props.match.params.userId)
    .then(profile=> {
      if (profile.username === null){
        profile.username = "New User"
      }
      profile.user_id = profile.user_id.toString()
      getUserTips(this.props.match.params.userId)
      .then(res=> {
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
    let { profile, user } = Object.assign({},this.state)

    [model][e.target.name] = e.target.value
    this.setState({ model })
  }

  // This uploads the image url to our database
  handleImage = (url) => {
    let { profile, currentProfile, form } = this.state
    editProfile(profile.id, {profile: {image: url}})
    .then(res => {
      currentProfile.image = profile.image = url
      form.image = false
      this.setState({ currentProfile, profile, form })
    })
  }

  // This toggles the appropriate form field to appear
  toggleFormField = (field) => (e) => {
    e.preventDefault()

    let { form } = this.state
    form[field] = !form[field]
    this.setState({ form })
  }

  // This performs the appropriate fetch call on submit
  handleSubmit = (parameter) => (e) => {
    e.preventDefault()
    let { profile, user, form } = this.state

    // Profile form fields
    // NOTE: Need to find a way to notify that a username is already taken
    if (parameter === "food_types" || parameter === "username" || parameter === "bio"){
      editProfile(profile.id, profile)
      .then(res =>{
        form[parameter] = false
        this.setState({currentProfile: {...profile}, form})
      })
      .catch(err =>{ alert(err) })
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
      .then(res =>{
        user.email = user.current_password_email = user.password = user.password_confirmation = user.current_password = ""
        if (res.includes("SyntaxError: Unexpected end of JSON input")){
          form[parameter] = false
          this.setState({ user, form }, alert('Account updated successfully'))
        } else {
          this.setState({ user }, alert('Double check input accuracy and try again'))
        }
      })
      // Not sure if necessary to be honest since I added a catch to AuthService's fetch
      .catch(err =>{ alert(err) })
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
        className = "dashboard-form-item"
        placeholder = {placeholder}
        name = {parameter}
        type = {type}
        onChange = {this.handleChange(stateObject)}
        value = {this.state[stateObject][parameter]}
        />
      )
    } else {
      return (
        <input
        className = "dashboard-form-item"
        placeholder = {placeholder}
        name = {parameter}
        type = {type}
        onChange = {this.handleChange(stateObject)}
        value = {this.state[stateObject][parameter]}
        />
      )
    }
  }

  render() {
    let { tips, userId, currentProfile, form  } = this.state
    let tipList = tips.map(tip => {
      return <Tip key={tip.id} tip={tip} userId={userId}/>
    })
    return (

      <div className="main">
        { currentProfile.user_id === userId
          ? <div >
              <h1>Dashboard</h1>
              {/* -------------- USERNAME ------------------ */}

              {
                form.username
                ? this.createFormField("username")
                : <h2 onClick={this.toggleFormField("username")}>
                {currentProfile.username}
                </h2>
              }

              {/* -------------- PROFILE IMAGE ------------------ */}

              {
                form.image
                ? <ImageUploader location="profile-images" handleImage={this.handleImage} />
                : <div className="profile-image-container">
                    <img className="profile-image" src={currentProfile.image} alt="Your avatar" />
                  </div>
              }

              <button className="btn" onClick={this.toggleFormField("image")}>Edit Avatar</button>


              {/* -------------- ABOUT ------------------ */}
              {
                form.bio
                ? this.createFormField("bio")
                : <p onClick={this.toggleFormField("bio")}>
                    {currentProfile.bio}
                  </p>
              }

              {/* -------------- FAVORITE FOODS ------------------ */}
              <p children={"Food categories of restaurants you'd like to see tips for:"} />
              {
                form.food_types
                ? this.createFormField("food_types")
                : <p onClick={this.toggleFormField("food_types")}>
                    {currentProfile.food_types}
                  </p>
              }

              {/* -------------- EMAIL ------------------ */}
              <button className="btn" onClick={this.toggleFormField("email")}>Edit Email</button>
              <div className="form-field">
                {form.email && this.createFormField("email")}
              </div>

              {/* -------------- PASSWORD ------------------ */}
              <button className="btn" onClick={this.toggleFormField("password")}>Edit Password</button>
              {form.password && this.createFormField("password")}
            </div>
          :
            <div>
            <h1 children={`${currentProfile.username}'s Profile`} />
            <img src={currentProfile.image} alt={`${currentProfile.username}'s avatar'`}/>
            <h2 children={`${currentProfile.username}`} />
            <p children={currentProfile.bio} />
            <FollowButton followText={"This profile"} followUserId={this.props.match.params.userId} />
            </div>
          }
            <h1 children={`How ${currentProfile.username} eats better:`} />
            {tipList}

      </div>

    );
  }
}

export default userProfile;
