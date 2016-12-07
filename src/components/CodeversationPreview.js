import React, { PropTypes } from 'react';
import { ListGroup, ListGroupItem, Grid, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Username from './Username';
import { ISO_ROOT, V1_API_BASE } from 'config';

const CodeversationPreview = ({ codeversation, style, user, onDelete, token }) => {
  return (
    <ListGroupItem
      style={style}
      >
      <Row>
        <Col md={2}>
          <Link to={`view/${codeversation.id}`}><h3>{codeversation.title}</h3></Link>
        </Col>
        {do{
          if(user &&(user.id === codeversation._creator.id))
            <Col md={1} mdOffset={9}>
            <Button
              bsStyle = "danger"
              onClick = {() => {
                fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation/${codeversation.id}`, {
                  method: "DELETE",
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
										'Authorization': token,
									},
                })
								.then(() => onDelete())
                .catch(err=>console.error(err));
              }}
              >Delete
            </Button>
        </Col>}}
      </Row>
      <Username user={codeversation._creator} />
    </ListGroupItem>
  );
}

CodeversationPreview.propTypes = {
  style: PropTypes.object,
  codeversation: PropTypes.object.isRequired,
	onDelete: PropTypes.func,
}

export default CodeversationPreview;
