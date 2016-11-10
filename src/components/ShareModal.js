import React, { PropTypes, Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl, InputGroup, Modal } from 'react-bootstrap';

class ShareModal extends Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.close}
      >
        <Modal.Header closeButton>
          Share this link with a friend!
        </Modal.Header>
        <Modal.Body>
          {`www.codeversation.com${this.props.location.pathname}`}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShareModal;
