import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import AppIcon from "./AppIcon";
import Config from "./config.json";

class AppNavbar extends Component {
  render() {
    let nav = (
      <Nav>
        <Navbar.Brand
          href="/"
        >
          <AppIcon
            height="30"
            width="auto"
            className="d-inline-block mr-1"
          />
          {' '}
          { Config.name }
        </Navbar.Brand>
        <Nav.Link disabled href="#">
          About
        </Nav.Link>
        <Nav.Link disabled href="#">
          Beta
        </Nav.Link>
        <Nav.Link href="/contact">
          Contact
        </Nav.Link>
      </Nav>
    );

    return (
      <Container>
        <Navbar expand="lg" className="pt-5 pl-0 ml-0">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {nav}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

export default AppNavbar;
