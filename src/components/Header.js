import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = ({username, ...props}) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Codeversation
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem href='/profile'>{username}</NavItem>
      <NavItem href='/create'>Create</NavItem>
      </Nav>
    </Navbar>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};

export default Header;
