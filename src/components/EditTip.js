import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class editTip extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h1>Edit Tip</h1>
          <p>Restaurant</p>
            <button>Edit Restaurant</button>
          <p>Description</p>
            <button>Edit Description</button>
          <p>Image</p>
            <img src="./images/eggnog-blossoms.jpg"/>
            <button>Edit Image</button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default editTip;