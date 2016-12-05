import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Grid, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Username from './Username';

const CodeversationPreview = ({ codeversation, style, user }) => {
  console.log(codeversation)
  console.log(user)
  return (
    <ListGroupItem
      style={style}
      >
      <Row>
        <Col md={2}>
          <Link to={`view/${codeversation.id}`}><h3>{codeversation.title}</h3></Link>
        </Col>
        {do{
          if(user &&(user.id === codeversation._creator.id))<Col md={1} mdOffset={9}><Button bsStyle = "danger">Delete </Button></Col>}}
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
