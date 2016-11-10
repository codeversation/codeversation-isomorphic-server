import React, { PropTypes, Component } from 'react';

class PostComment extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.content}</h2>
      </div>
    );
  }
};

export default PostComment;
