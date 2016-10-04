import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
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
      <form>
        <FormGroup>
          <FormControl
            type='email'
            value={this.state.value}
            placeholder='Enter username'
            onChange={::this.handleUsernameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form> 
    );
  }
}

export default Login;
