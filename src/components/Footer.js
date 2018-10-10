import React, { Component } from 'react'
import '../css/index.css';

class Footer extends Component {

render() {
    return (
        <div>
            <div className="footer">
                <a href='/home'>Home</a>
                <a href="/addtip">Add Tip</a>
                <a href="/">Support</a>
            </div>
        </div>
    );
}
}

export default Footer;
