import React, { Component } from 'react';
// import Tip from './Tip'
import SideImage from '../images/eggnog-blossoms.jpeg'
import '../css/tipFeed.css'
import { Row, Container, Col, ListGroup, ListGroupItem } from 'reactstrap'

class TipFeed extends Component {

  render() {
    return (
      <div>
          <ListGroup className="listGroup-container">
          {/* --------- tip container ---------- */}
            <ListGroupItem className="tip-container">

            {/* ---------image container ---------- */}
              <div className="image-container">
              <img className="image" src={SideImage}/>
              </div>

              {/* --------- info container ---------- */}
              <div className="info-container">
                <div className="top-info">
                  <p style={{border:"solid pink 1px", marginTop:"13px"}}>Username</p>
                  <button>Follow</button>
                </div>

                <div className="middle-info">
                  <h4>EGG ROllS</h4>
                  <p>Dessert</p>
                </div>

                <div className="bottom-info">
                  <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
                </div>

              </div>
            </ListGroupItem>
          </ListGroup>
      </div>
    );
  }
}

export default TipFeed;
