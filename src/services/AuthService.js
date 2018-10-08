import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:3001' // We can pass in the backend server, or use a default for dev
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getUserId = this.getUserId.bind(this)
  }

  login(email, password) {
    return this.fetch(`${this.domain}/users/sign_in`, { // Our backend endpoint
      method: 'POST',
      body: JSON.stringify({
        user: { // We pass in email and password from the login form
          email,
          password
        }
      })
    })
  }

	register(user) {
		return this.fetch(`${this.domain}/users`, {
			method: 'POST',
			body: JSON.stringify(user)
		})
	}

  updateUser(user) {
    return this.fetch(`${this.domain}/users`, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
  }

  // updateUser({email = undefined, password = undefined, password_confirmation = undefined, current_password = undefined}) {
  //   return this.fetch(`${this.domain}/users`, {
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       user: {
  //         email,
  //         password,
  //         password_confirmation,
  //         current_password
  //       }
  //     })
  //   })
  // }

  loggedIn() { // A check to see if user is logged in
    const token = this._getTokenFromLocalStorage()
    return !!token && !this.isTokenExpired(token)
  }

  // Tokens are only valid for a certain period of time, determined by the server.
  // When the one used by the React application, another one needs to be fetched.
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  // Removes the token
  logout() {
    localStorage.removeItem('id_token');
  }

  // We can decode the token and find the user's ID for subsequent calls to the server
  getUserId() {
    const token = decode(this._getTokenFromLocalStorage());
    return token.sub
  }

  // Enhance the standard version of fetch() by
  // adding the authentication headers into every request
  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
      headers['Authorization'] = this._getTokenFromLocalStorage()
      console.log(headers)
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus.bind(this))
    .then(this._captureToken.bind(this))
    .then(response => response.json())
    .catch(err => {return err.toString()})
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  _captureToken(response){
    var header = response.headers.get("Authorization")
    if(header){
      this._setTokenInLocalStorage(response.headers.get("Authorization"))
    }
    console.log(response)
    return response
  }

  // The token is stored in the browser
  _setTokenInLocalStorage(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  // Fetch the token from local storage
  _getTokenFromLocalStorage() {
    return localStorage.getItem('id_token')
  }
}
