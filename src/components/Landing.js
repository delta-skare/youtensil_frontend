import React, { Component } from 'react';
import { Button } from 'reactstrap';
import '../css/Full.css';
import logo from '../images/youtensil_tagline_blk.png'

class Landing extends Component {

render() {
    return (
        <div className="background">
            <div>
                <img className="img-logo" src={logo} alt="Youtensil Logo"/>
                <div className="button">
                    <Button><a href='/login'>login</a></Button>
                    <br></br>
                    <Button><a href='/register'>register</a></Button>
                </div>
            </div>
        </div>
    );
}
}

export default Landing;
