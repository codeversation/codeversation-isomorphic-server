import React, { PropTypes, Component } from 'react';
import Snippet from './Snippet';
import SnippetOutput from './SnippetOutput';
import CommentList from './CommentList';
import { Grid } from 'react-bootstrap';

class Post extends Component {
  render() {
    return (
      <Grid>
        <Snippet id={this.props.snippetId}/>
        <CommentList snippetId={this.props.snippetId}/>
      </Grid>
    );
  }
}

Post.propTypes = {
  snippetId: PropTypes.string.isRequired
}

export default Post;
