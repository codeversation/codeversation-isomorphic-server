import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import FormFieldGroup from './FormFieldGroup';
//redux
import { user } from 'actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'',
      password:'',
      error: false,
      isLoading: false
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLogin() { 
    fetch('http://localhost:3000/v1/session', {
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
        alert(res);
      })
      .catch((err) => {
        console.error(err);
        alert('Error signing in');
      });
  }

  render() {
    const router = this.context.router;
    return (
      <Grid>
        <Row>
          <Col md={1} mdOffset={5}>
            <h1>Login</h1>
          </Col>
        </Row>
        <form>
          <Row>
            <Col md={6} mdOffset={3}>
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
            <Col md={1} mdOffset={4}>
              <Button 
                bsSize='large'
                onClick={this.handleLogin.bind(this)}
              >
                Login
              </Button>
            </Col>
            <Col md={1} mdOffset={1}>
              <Link to='register'>
                <Button bsSize='large'>
                  Sign Up
                </Button>
              </Link>
            </Col>
          </Row>
        </form> 
      </Grid>
    );
  }
}

Login.propTypes = {
  // redux props
  user: PropTypes.object.isRequired
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

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
