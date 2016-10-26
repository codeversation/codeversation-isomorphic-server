import React, { PropTypes, Component } from 'react'
import { Button } from 'react-bootstrap';
import {Grid, Row, Col } from 'react-bootstrap';
import SnippetOutput from './SnippetOutput';

class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: 'return "hello'
    }
  }

  render() {
    return (
      <Grid>
        <h2> I am a snippet</h2>
        <SnippetOutput snippet={this.state.snippet}/>
      </Grid>
    );
  }
};

export default Snippet;
