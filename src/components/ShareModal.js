import React, { PropTypes, Component } from 'react';
import { Button, FormGroup, InputGroup, Modal } from 'react-bootstrap';

class ShareModal extends Component {
  render() {
    return (
      <Modal>
        <Modal.Header>
          Share!
        </Modal.Header>
        <Modal.Body>
          <Button>
            Copy
          </Button>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button>>
                  {`www.codeversation.com${this.props.location.pathname}`}
                </Button>
              </InputGroup.Button>
              <FormControl type='textarea' />
            </FormControl.Static>
          </FormGroup>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShareModal;
