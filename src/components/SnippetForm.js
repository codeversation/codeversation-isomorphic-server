import React, { PropTypes, Component } from 'react'
import SnippetOutput from './SnippetOutput';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';

import { log } from 'utilities';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/ruby';
import 'brace/mode/java';
import 'brace/theme/github';

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
          <Col md={8} >
            <AceEditor
              mode="ruby"
              theme="github"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
            />
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
