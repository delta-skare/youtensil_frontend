import React, { Component } from 'react'
import '../css/index.css';

class Footer extends Component {

render() {
    return (
        <div className="footer">
            <a href='/home'>Home</a>
            <a href="/team">Team</a>
            <a href="/credits">Credits</a>
        </div>
    );
}
}

export default Footer;
