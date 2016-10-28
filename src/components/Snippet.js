import React, { PropTypes, Component } from 'react'
import { Button } from 'react-bootstrap';
import {Grid, Row, Col } from 'react-bootstrap';
import SnippetOutput from './SnippetOutput';

class Snippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snippet: `def add(x, y)\n\treturn x + y\nend`
    }
  }

  render() {
    return (
      <Grid>
        <pre><code>
            {this.state.snippet}
        </code></pre>
        <SnippetOutput snippet={this.state.snippet}/>
      </Grid>
    );
  }
};

export default Snippet;
