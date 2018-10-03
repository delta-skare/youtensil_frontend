import React, { Component } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';

class Landing extends Component {

render() {
    return (
        <div>
            <NavBar />
            <div>
                <h1>youtensil</h1>
                <h2>Tagline</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <Footer />
        </div>
    );
}
}

export default Landing;

