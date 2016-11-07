import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import FormFieldGroup from './FormFieldGroup';
import decode from 'jwt-decode';
//redux
import { user } from 'actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      error: false,
      showModal: false,
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLogin() {
    fetch('http://localhost:3000/api/v1/session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.username,
          password: this.state.password
        }
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const userData = decode(resData.token);
        console.log(userData);
        this.props.loginUser(userData);
        this.props.close();
      })
      .catch((err) => {
        console.error(err);
        alert('Error signing in');
      });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>  
        </Modal.Header>
        <Modal.Body>
          <Grid>
            <form>
              <Row>
                <Col md={6}>
                  <FormFieldGroup
                    label='Username'
                    type='email'
                    value={this.state.username}
                    onChange={this.handleUsernameChange.bind(this)}
                    feedback={true}
                  />
                  <FormFieldGroup
                    label='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)}
                    feedback={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={1} mdOffset={1}>
                  <Button
                    bsSize='large'
                    onClick={this.handleLogin.bind(this)}
                  >
                    Login
                  </Button>
                </Col>
                <Col md={1} mdOffset={1}>
                  <Link to='register'>
                    <Button 
                      onClick={this.props.close}
                      bsSize='large'
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Col>
              </Row>
            </form>
          </Grid>
        </Modal.Body>
      </Modal>
    );
  }
}

Login.propTypes = {
  // redux props
  user: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  loginUser(userData) {
    Object.keys(userData).map((key) => {
      dispatch(user.insert(key, userData[key]));
    })
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
