import React, { PropTypes, Component } from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';
import Username from './Username';

class PostComment extends Component {
  render() {
    return (
      <Well bsSize='small'>
        <Grid>
          <Col>
            <h4><u><Username user={this.props.poster} /></u></h4>
          </Col>
          <Col>
            <p>{this.props.content}</p>
          </Col>
        </Grid>
      </Well>
    );
  }
};

export default PostComment;
