import React, { Component } from 'react';
import '../css/Feed.css'

class UserProfileFeed extends Component {

  render() {
    return (
      <div className="userFeedBackground">
        <div className="container row">
          <div col-lg-6 className="item">
              <h1>Username</h1>
              <p>Fav Cuisine</p>
              <img src="../images/woman-silhouette.jpg"/>
          </div>
          <div col-lg-6 className="item">
              <h1>Username</h1>
              <p>Fav Cuisine</p>
              <img src="../images/woman-silhouette.jpg"/>
          </div>
          <div col-lg-6 className="item">
              <h1>Username</h1>
              <p>Fav Cuisine</p>
              <img src="../images/woman-silhouette.jpg"/>
          </div>
          <div col-lg-6 className="item">
              <h1>Username</h1>
              <p>Fav Cuisine</p>
              <img src="../images/woman-silhouette.jpg"/>
          </div>
        </div>
      </div>

    );
  }
}

export default UserProfileFeed;
