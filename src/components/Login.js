import React, { Component } from 'react';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import FormFieldGroup from './FormFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'',
      password:''
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <Grid>
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
                type='submit'
                bsSize='large'
              >
                Login
              </Button>
            </Col>
            <Col md={1} mdOffset={1}>
              <Button bsSize='large'>
                Sign Up
              </Button>
            </Col>
          </Row>
        </form> 
      </Grid>
    );
  }
}

export default Login;
