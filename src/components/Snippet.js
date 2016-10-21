import React, { PropTypes, Component } from 'react'
import { Button } from 'react-bootstrap';
import {Grid, Row, Col } from 'react-bootstrap';
import SnippetOutput from './SnippetOutput';
import { COMPILER } from '../config';
import { Opal } from 'opal-npm-wrapper';

class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: '',
      snippetOutput: 'Click Run to see your Snippet Output'
    }
  }
  handleRunSnippet() {
    fetch(COMPILER + 'api/v1/ruby', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: this.state.snippet
      })
    })
      .then(res => res.json())
      .then((json) => {
        const ret = eval(json.js);
        this.setState({
          snippetOutput:ret 
        })
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.snippetOutput);
    return (
      <Grid>
        <h2> I am a snippet</h2>
        <SnippetOutput output={this.state.snippetOutput}/>
        <Button onClick={this.handleRunSnippet.bind(this)}>Run</Button>
      </Grid>
    );
  }
};

export default Snippet;
