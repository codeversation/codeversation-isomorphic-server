import React, { PropTypes, Component } from 'react'
import PostTitle from './PostTitle';
import Snippet from './Snippet';
import CommentList from './CommentList';

class Codeversation extends Component {
  render() {
    return (
      <div>
        <PostTitle />                 
        <Snippet />
        <CommentList />
      </div> 
    );
  }
};

export default Codeversation;
