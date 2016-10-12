import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
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
            <FormFieldGroup
              label='Username'
              type='email'
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              feedback={true}
            />
          </Row>
          <Row>
            <FormFieldGroup
              label='Password'
              type='password'
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)}
              feedback={true}
            />
          </Row>
          <Button 
            type='submit'
            bsSize='large'
          >
            Login
          </Button>
          <Button bsSize='large'>
            Sign Up
          </Button>
        </form> 
      </Grid>
    );
  }
}

export default Login;
