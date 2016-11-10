import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';
import FormFieldGroup from './FormFieldGroup';
//redux
import { user } from 'actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      error: false,
      showModal: false,
    };
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLogin() {
		let { email, password } = this.state;

    this.props.loginUser({ email, password })
      .then(() => {
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
                    label='Email'
                    type='email'
                    value={this.state.email}
                    onChange={::this.handleEmailChange}
                    feedback={true}
                  />
                  <FormFieldGroup
                    label='Password'
                    type='password'
                    value={this.state.password}
                    onChange={::this.handlePasswordChange}
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
  loginUser: userData => dispatch(user.login(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
