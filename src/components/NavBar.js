import React, { Component } from 'react'

class NavBar extends Component {

render() {
    return (
        <nav>
            <div>
                <ul>
                <li>Home</li>
                <li>Tips</li>
                <li>Team</li>
                </ul>
            </div>
            <div>
                <form>
                    <input type="search" placeholder="Search" />
                    <button type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}
}

export default NavBar;
