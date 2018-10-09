import React, { Component } from 'react';

class addTip extends Component {

  render() {
    return (
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
    );
  }
}

export default addTip;