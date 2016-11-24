import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

const CodeversationPreview = ({ codeversation, style }) => {
  return (
    <ListGroupItem
      style={style}
      >
      <Link to={`view/${codeversation.id}`}><h3>{codeversation.title}</h3></Link>
      <p>{codeversation._creator.email}</p>
    </ListGroupItem>
  );
}

CodeversationPreview.propTypes = {
  style: PropTypes.object,
  codeversation: PropTypes.object.isRequired
}

export default CodeversationPreview;
