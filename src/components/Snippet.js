import React, { PropTypes, Component } from 'react'
import { Button } from 'react-bootstrap';
import SnippetOutput from './SnippetOutput';
import { COMPILER } from '../config';
import { Opal } from 'opal-npm-wrapper';

class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: ''
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
        eval(json.js);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h2> I am a snippet</h2>
        <SnippetOutput />
        <Button onClick={this.handleRunSnippet.bind(this)}>Run</Button>
      </div> 
    );
  }
};

export default Snippet;
