import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router';

const Header = ({username, user, ...props}) => {
  const jsUser = user.toJS();
  const rightNavItem = user.size === 0 ?
    <NavItem eventKey={2} href='/login'>login/signup</NavItem>
    :
    <NavItem eventKey={1} href={`profile/${jsUser.id}`}>{jsUser.name}</NavItem>
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
        {rightNavItem}
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
