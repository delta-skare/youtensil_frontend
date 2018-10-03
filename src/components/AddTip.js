import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class addTip extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <h1>Add Tip</h1>
          <p>Restaurant</p>
          <input></input>
          <p>Description</p>
          <textarea></textarea>
          <p>Image</p>
          <img src="./images/eggnog-blossoms.jpg"/>
          <button>Submit</button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default addTip;