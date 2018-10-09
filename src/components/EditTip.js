import React, { Component } from 'react';
import '../css/TwoThird.css';

class editTip extends Component {

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default editTip;