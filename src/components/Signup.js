import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import FormFieldGroup from './FormFieldGroup';
import { ISO_ROOT, V1_API_BASE } from 'config';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      name: '',
      error: false,
      isLoading: false
    };
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleConfirmChange(e) {
    this.setState({confirm: e.target.value});
  }

  handleSignup() {
    if(this.state.password != this.state.confirm){
      alert("Passwords do not match.");
      return;
    }

    fetch(`${ISO_ROOT}${V1_API_BASE}/user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          confirm: this.state.confirm
        }
      })
    })
      .then((data) => {
        this.context.router.push('/');
      })
      .catch((err) => {
        console.error(err)
        alert('Error signing up.');
      });
  }

  render() {
    const router = this.context.router;
    return (
      <Grid>
        <Row>
          <Col md={1} mdOffset={5}>
            <h1>Signup</h1>
          </Col>
        </Row>
        <form>
          <Row>
            <Col md={6} mdOffset={3}>
              <FormFieldGroup
                label='Name'
                type='text'
                value={this.state.name}
                onChange={this.handleNameChange.bind(this)}
                feedback={true}
              />
              <FormFieldGroup
                label='Email'
                type='email'
                value={this.state.email}
                onChange={this.handleEmailChange.bind(this)}
                feedback={true}
              />
              <FormFieldGroup
                label='Password'
                type='password'
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                feedback={true}
              />
              <FormFieldGroup
                label='Confirm'
                type='password'
                value={this.state.confirm}
                onChange={this.handleConfirmChange.bind(this)}
                feedback={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md={1} mdOffset={5}>
              <Button
                bsSize='large'
                onClick={this.handleSignup.bind(this)}
              >
                Signup
              </Button>
            </Col>
          </Row>
        </form>
      </Grid>
    );
  }
}

Signup.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Signup;
