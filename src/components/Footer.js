import React, { Component } from 'react'
import '../css/index.css';

class Footer extends Component {

render() {
    return (
        <div className="footer">
            <a href='/dashboard'>Home</a>
            <a href="/addtip">Add Tip</a>
            <a href="/">Support</a>
        </div>
    );
}
}

export default Footer;
