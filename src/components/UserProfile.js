import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class userProfile extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h1>Profile</h1>
            <p>Username</p>
            <img src="./images/woman-silhoutte.jpg"/>
            <h2>Favorite Cuisines</h2>
                <p>Italian, and Indian</p>
            <h3>About</h3>
                <p>I mountain bike and work at The Andaz Hotel in downtown San Diego.</p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default userProfile;
