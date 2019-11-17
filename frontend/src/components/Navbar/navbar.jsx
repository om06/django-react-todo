import React, { Component } from "react";
import {
MDBNavbar, MDBBtn, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class Navbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Todo</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0 white-text p-3">
                  Howdy {this.props.heading} !

                </div>

              </MDBFormInline>
              
            </MDBNavItem>

            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0 white-text p-3">
                  Last Login : {this.props.lastLogin}

                </div>

              </MDBFormInline>
              
            </MDBNavItem>
            <MDBNavItem>
              
                <MDBBtn color="danger" type="button" className="ml-5" onClick={this.props.handleLogOut}>Logout</MDBBtn>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
    );
  }
}

export default Navbar;