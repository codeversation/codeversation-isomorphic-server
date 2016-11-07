import React, { Component, PropTypes } from 'react';
import Login from './Login';
import { NavItem, Navbar } from 'react-bootstrap';

class UserStateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  handleOpenModal() {
    this.setState({ showModal: true});
  }

  handleCloseModal() {
    this.setState({ showModal: false});
  }

  render() {
    const userJS = this.props.user.toJS();
    return (
      <NavItem
        onClick={!this.props.loggedIn ? this.handleOpenModal.bind(this) : null}
        href={!this.props.loggedIn ? null: `/profile/${userJS.id}`}
      >
        {!this.props.loggedIn ? 'login/signup' : userJS.name}
      <Login
        close={this.handleCloseModal.bind(this)}
        show={this.state.showModal}
      />
      </NavItem>
    );
  }
}

UserStateButton.propTypes = {
  user: PropTypes.object.isRequired
}
UserStateButton.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default UserStateButton;
