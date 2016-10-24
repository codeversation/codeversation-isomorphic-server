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

  handleCommentChange(e) {
    this.setState({comment: e.target.value});
  }

  handleComment(){
    // fetch('http://localhost:3000/api/v1/user', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // })

    // .then((data) => {
    //     console.log(data)
    //     this.context.router.push('/');
    // })
    // .catch((err) => {
    //     console.error(err)
    //     alert('Error posting your comment.');
    // });
	
	return;

  }

  render() {
	const router = this.context.router;
	    return (
	      <Grid>
	        <Row>
	          <Col md={1} mdOffset={5}>
	            <h1>Comment Form</h1>
	          </Col>
	        </Row>
	        <form>
	          <Row>
	            <Col md={6} mdOffset={3}>
	              <FormFieldGroup
	                label='Comment'
	                type='text'
	                value={this.state.comment}
	                onChange={this.handleCommentChange.bind(this)}
	                feedback={true}
	              />
	            </Col>
	          </Row>
	          <Row>
	            <Col md={1} mdOffset={4}>
	              <Button 
	                bsSize='large'
	                onClick={this.handleComment.bind(this)}
	              >
	                Submit
	              </Button>
	            </Col>
	          </Row>
	        </form> 
	      </Grid>
	    );
	  }
};

export default CommentForm;