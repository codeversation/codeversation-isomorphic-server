import React, { PropTypes, Component } from 'react'
import PostComment from './PostComment';
import CommentForm from './CommentForm';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    fetch(`http://localhost:3000/comment/${this.props.id}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          comments: json
        })
      })
      .catch(err => console.error(err));
  }  
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
