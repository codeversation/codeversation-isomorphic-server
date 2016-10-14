import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import FormFieldGroup from './FormFieldGroup';

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

  handleSubmit() { 
    this.setState({isLoading: true});
    setTimeout(function() { console.log('waiting...') }, 1000);
    alert(this.state.username +  ' logged in');
    this.setState({isLoading: false});
    this.props.loginUser('Jeremy');
    this.context.router.push('/profile/0001');
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
        <form onSubmit={this.handleSubmit.bind(this)}>
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
                type='submit'
                bsSize='large'
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

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

import { user } from 'actions';

const mapDispatchToProps = dispatch => ({
  loginUser(user) {
    dispatch(user.login(user));
  }
});

export default connect(
  mapDispatchToProps
)(Login);
