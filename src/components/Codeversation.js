import React, { PropTypes, Component } from 'react'
import PostTitle from './PostTitle';
import Snippet from './Snippet';
import CommentList from './CommentList';
import Loading from './Loading';
import { Grid, Col, Row, Well, PageHeader } from 'react-bootstrap';

class Codeversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      codeversation: {},
      curSnippet: 0
    }
  }
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/codeversation/${this.props.params.id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoading: false,
          codeversation: json
        })
      })
      .catch((err) => {
        console.error(err);
      })

  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    const { codeversation } = this.state;
    return (
      <Grid>
        <PageHeader>{codeversation.title}</PageHeader>
        <Well>{codeversation.content}</Well>
        <Snippet />
        <CommentList />
      </Grid>
    );
  }
};

export default Codeversation;
