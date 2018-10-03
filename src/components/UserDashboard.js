import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class userDashboard extends Component {

  render() {
    return (
        <div>
            <NavBar />
            <div>
                <h1>Dashboard</h1>
                <h2>Username</h2>
                    <p>Username</p>
                    <button>Edit Username</button>
                <h3>Email</h3>
                    <p>Email</p>
                    <button>Edit Email</button>
                <h3>Password</h3>
                    <button>Edit Password</button>
                <h3>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <button>Edit About</button>
                <h3>Image</h3>
                <img src="./images/woman-silhoutte.jpg"/>
                    <button>Edit Image</button>
            </div>
            <Footer />
        </div>
    );
  }
}

export default userDashboard;