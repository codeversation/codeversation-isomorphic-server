import React, { PropTypes, Component } from 'react'
import PostComment from './PostComment';
import CommentForm from './CommentForm';

class CommentList extends Component {
  render() {
    return (
      <div>
        <h2>I am a comment list</h2>
        <PostComment />
        <CommentForm />
      </div> 
    );
  }
};

export default CommentList;
