import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem, Navbar } from 'react-bootstrap';
import Login from './Login';

class LoginButton extends Component {
  render() {
    return(
      <p
        onClick={this.props.openModal.bind(this)}
      >
        login/signup
      </p>
    );
  }
}

class ProfileButton extends Component {
  render() {
    return(
      <LinkContainer to={`profile/${this.props.userId}`}>
        <p>
          {this.props.userName}
        </p>
      </LinkContainer>
    );
  }
}

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
      <div>
      {this.props.loggedIn ? 
        <ProfileButton userName={userJS.name} /> :
        <LoginButton openModal={this.handleOpenModal.bind(this)} />
      }
      <Login
        close={this.handleCloseModal.bind(this)}
        show={this.state.showModal}
      />
      </div>
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
