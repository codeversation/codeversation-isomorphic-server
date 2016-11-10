import React, { PropTypes, Component } from 'react'
import FormFieldGroup from './FormFieldGroup';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      comment: ''
    };
  }



  render() {
    const router = this.context.router;
    return (
      <Grid>
        <form>
          <Row>
            <Col md={6}>
              <FormFieldGroup
                label='Post a Comment'
                type='text'
                value={this.props.comment}
                onChange={this.props.onCommentChange}
                feedback={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <Button 
                bsSize='large'
                onClick={this.props.postComment}
              >
                Post Comment
              </Button>
            </Col>
          </Row>
        </form> 
      </Grid>
    );
  }
};

export default CommentForm;
