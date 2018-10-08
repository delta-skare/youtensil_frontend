import React, { Component } from 'react';
// import Tip from './Tip'
import '../css/Feed.css'

class tipFeed extends Component {

  render() {
    return (
      <div className="tipFeedBackground">
        <div className="container row">
          <div col-3 className="item">
              <h1>Tip Title</h1>
              <p>Tip Description</p>
              <p>Tip Category</p>
              <img src="../images/eggnog-blossoms.jpg"/>
          </div>
          <div col-3 className="item">
              <h1>Tip Title</h1>
              <p>Tip Description</p>
              <p>Tip Category</p>
              <img src="../images/eggnog-blossoms.jpg"/>
          </div>
          <div col-3 className="item">
              <h1>Tip Title</h1>
              <p>Tip Description</p>
              <p>Tip Category</p>
              <img src="../images/eggnog-blossoms.jpg"/>
          </div>
          <div col-3 className="item">
              <h1>Tip Title</h1>
              <p>Tip Description</p>
              <p>Tip Category</p>
              <img src="../images/eggnog-blossoms.jpg"/>
          </div>
        </div>
      </div>
    );
  }
}

export default tipFeed;
