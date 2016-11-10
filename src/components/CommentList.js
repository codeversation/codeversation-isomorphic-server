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
    fetch(`http://localhost:3000/api/v1/comment/${this.props.id}`)
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
        <h2>Comments</h2>
        {this.state.comments.map((comment) => {
            return <PostComment />;
        })}
        <CommentForm codeversationId={this.props.id}/>
      </div> 
    );
  }
};

export default CommentList;
