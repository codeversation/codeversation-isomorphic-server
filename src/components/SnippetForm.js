import React, { PropTypes, Component } from 'react'
import SnippetOutput from './SnippetOutput';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';

import { log, env } from 'utilities';

let brace;
let AceEditor;
let AceWrapper;

if(env() === 'browser') {
  brace = require('brace');
  AceEditor = require('react-ace').default;

  require('brace/mode/ruby');
  require('brace/mode/java');
  require('brace/theme/kuroir');
  
  AceWrapper = () =>
    <AceEditor
      mode="ruby"
      theme="kuroir"
      name="code_form"
      editorProps={{$blockScrolling: true}}
    />
  ;

} else {
  AceWrapper = 'div';
}


class Snippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: 'puts "lksdf"',
    };
  }

  handleKeyDown(ev) {
    this.setState({ code: this.state.code + 'a' });
    log(this.state.code);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <h2> I am a snippet </h2>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <AceWrapper />
          </Col>
          <Col md={4} >
            <SnippetOutput />
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Snippet;
