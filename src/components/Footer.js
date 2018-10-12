import React, { Component } from 'react'
import '../css/index.css';

class Footer extends Component {

render() {
    return (
        <div className="footer main">
            <a href='/home'>Home</a>
            <a href="/team">Team</a>
            <a href="mailto:hello.youtensil@gmail.com">Support</a>
        </div>
    );
}
}

export default Footer;
