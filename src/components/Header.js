import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import UserStateButton from './UserStateButton';

const Header = ({ user, ...props }) => {
  const loggedIn = user.size !== 0;
  return (
    <Navbar inverse fluid>
      <Navbar.Header >
        <Navbar.Brand>
          <Link to='/'>Codeversation</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <LinkContainer to='/new'>
          <NavItem 
            eventKey={1} 
            style={{}}
          >
            Create Codeversation
          </NavItem>
        </LinkContainer>
        <NavItem>
          <UserStateButton
            user={user}
            loggedIn={loggedIn}
          />
        </NavItem>
      </Nav>
    </Navbar>
  );
}

Header.propTypes = {
  // redux props
  user: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps
)(Header);
