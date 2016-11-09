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
                  Copy
                </Button>
              </InputGroup.Button>
              <FormControl type='textarea'>
                {`www.codeversation.com${this.props.location.pathname}`}
              </FormControl>
            </FormControl.Static>
          </FormGroup>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShareModal;
