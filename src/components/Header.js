import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Codeversation
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href='create'>Create</NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;
