import React, { Component } from 'react';
import withAuth from './withAuth'
import AuthService from '../services/AuthService'
import { getOrMakeProfileByUserId as getProfile, editProfile } from '../services/ProfileService'

class userDashboard extends Component {
  constructor(props){
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
      }
    }
  }
  // This gets the current user's profile data on render and sets state
  // Need to figure out how to get email from devise
  componentDidMount() {
    getProfile(this.props.userId)
    .then(profile => {
      this.setState({
        profile,
        currentProfile: {...profile}
      })
    })
  }

  // This updates the appropriate state object on input change
  // NOTE: Getting react errors here, need to check with instructors
  handleChange = (model) => (e) => {
    e.preventDefault()
    let { profile, user } = this.state

    [model][e.target.name] = e.target.value
    this.setState({ model })
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
      editProfile(this.state.profile.id, this.state.profile)
      .then(res =>{
        this.setState({currentProfile: {...profile}})
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
          className="form-submit"
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
      placeholder = "Current password confirmation required"
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
        className = "form-item"
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
        className = "form-item"
        placeholder = {placeholder}
        name = {parameter}
        type = {type}
        onChange = {this.handleChange(stateObject)}
        value = {this.state[stateObject][parameter]}
        />
      )
    }
  }

  // Each field has a button that affects the subsequent conditional render
  /*
  The image field does not yet have this functionality but will be added
  when Enrique solidifies file upload
  */
  render() {
    let { currentProfile, form } = this.state
    return (
        <div>
            <div>
                <h1>Dashboard</h1>
                <p><img src="../images/woman-silhouette.jpg" alt="Your avatar"/></p>
                    <button onClick={this.toggleFormField("image")}>Edit Image</button>
                <h2>Username</h2>
                    <p>{currentProfile.username}</p>
                    <button onClick={this.toggleFormField("username")}>Edit Username</button>
                    {form.username && this.createFormField("username")}
                <h3>About</h3>
                    <p>{currentProfile.bio}</p>
                    <button onClick={this.toggleFormField("bio")}>Edit About</button>
                    {form.bio && this.createFormField("bio")}
                <h3>Favorite Foods</h3>
                    <p>{currentProfile.food_types}</p>
                    <button onClick={this.toggleFormField("food_types")}>Edit Foods</button>
                    {form.food_types && this.createFormField("food_types")}
                <h3>Email</h3>
                    <p>Email</p>
                    <button onClick={this.toggleFormField("email")}>Edit Email</button>
                    {form.email && this.createFormField("email")}
                <h3>Password</h3>
                    <button onClick={this.toggleFormField("password")}>Edit Password</button>
                    {form.password && this.createFormField("password")}
            </div>
        </div>
    );
  }
}

export default withAuth(userDashboard);