import React, { Component } from 'react';
// import Tip from './Tip'
import NavBar from './NavBar';
import Footer from './Footer';

class tipFeed extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div>
            <h1>Tip Title</h1>
            <p>Tip Description</p>
            <p>Tip Category</p>
            <img src="./images/eggnog-blossoms.jpg"/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default tipFeed;
