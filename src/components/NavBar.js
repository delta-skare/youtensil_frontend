import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import logo from '../images/youtensil_logo.png'
import '../css/index.css';
import AuthService from '../services/AuthService'




class NavBar extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService()
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          userStatus: this.Auth.loggedIn
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }


      render() {         
        return (
          <div className="main">
            <Navbar className="navnav navbar-dark" style={{position:"fixed", width:"100vw", top: "0"}}>
              <NavbarBrand href="/home"><img className="logo-img" src={logo} alt="Youtensil Logo"/></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar >
                <Nav className="ml-auto" navbar >
                  <NavItem>
                    { this.Auth.loggedIn() && 
                      <NavLink href="/home" onClick={this.Auth.logout}>Logout</NavLink>
                    }
                    { !this.Auth.loggedIn() &&
                      <NavLink href="/login">Login</NavLink>
                    }
                  </NavItem>
                  <NavItem>
                    <NavLink href="/register" >Register</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret>
                      More
                    </DropdownToggle>
                    <DropdownMenu right className="navdrop">
                      <DropdownItem>
                        <NavLink href="/profiles" className="navdrop">User Profiles</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/tips" className="navdrop">Tips</NavLink>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <NavLink href="/dashboard" className="navdrop">User Dashboard</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/addtip" className="navdrop">Add Tip</NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
    }

export default NavBar;
