import React, { PropTypes, Component } from 'react'
import FormFieldGroup from './FormFieldGroup';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
//redux
import { user } from 'actions';

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
    fetch('http://localhost:3000/api/v1/comment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        comment: {
          _creator: this.props.user.toJS().id,
          content: this.state.comment,
          likes: 0,
          _codeversation: this.props.codeversationId
        }
      })
    })

      .then((data) => {
        this.setState({
          comment: ''
        });
      })
      .catch((err) => {
        console.error(err)
        alert('Error posting your comment.');
      });

    return;

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
                value={this.state.comment}
                onChange={this.handleCommentChange.bind(this)}
                feedback={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <Button 
                bsSize='large'
                onClick={this.handleComment.bind(this)}
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

const mapStateToProps = ({ user }) => ({user});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
