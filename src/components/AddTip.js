import React, { Component } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import ImageUploader from './ImageUploader';
import { storage } from './firebase'

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
          <ImageUploader />
          <button>Submit</button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default addTip;
