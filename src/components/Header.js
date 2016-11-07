import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import UserStateButton from './UserStateButton';

const Header = ({ user, ...props }) => {
  const loggedIn = user.size !== 0;
  return (
    <Navbar inverse fluid>
      <Navbar.Header >
        <Navbar.Brand href='/'>
          <Link to='/'>Codeversation</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem 
          eventKey={1} 
          href='/new'
          style={{}}
        >
          Create Codeversation
        </NavItem>
        <UserStateButton
          user={user}
        />
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
