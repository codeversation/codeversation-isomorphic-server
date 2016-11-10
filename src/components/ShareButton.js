import React, { PropTypes, Component } from 'react';
import { Button } from 'react-bootstrap';
import ShareModal from './ShareModal';

class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }
  handleOpenModal() {
    this.setState({ showModal: true});
  }
  handleCloseModal() {
    this.setState({ showModal: false});
  }
  render() {
    return (
      <div>
        <Button 
          bsStyle='primary'
          onClick={this.handleOpenModal.bind(this)}
        >
          Share
        </Button>
        <ShareModal 
          close={this.handleCloseModal.bind(this)}
          show={this.state.showModal}
          location={this.props.location}
        />
      </div>
    );
  }
}

export default ShareButton;
