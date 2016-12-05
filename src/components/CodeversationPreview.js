import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Grid, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Username from './Username';

const CodeversationPreview = ({ codeversation, style, user }) => {
  return (
    <ListGroupItem
      style={style}
      >
      <Row>
        <Link to={`view/${codeversation.id}`}><h3>{codeversation.title}</h3></Link>
        {do{if(user.id === codeversation._creator) <Button bsStyle = "danger">Delete </Button>}}
      </Row>
      <Username user={codeversation._creator} />
    </ListGroupItem>
  );
}

CodeversationPreview.propTypes = {
  style: PropTypes.object,
  codeversation: PropTypes.object.isRequired
}

export default CodeversationPreview;
