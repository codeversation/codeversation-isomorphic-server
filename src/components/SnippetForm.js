import React, { PropTypes, Component } from 'react'
import SnippetOutput from './SnippetOutput';
import { Grid, Row, Col, Button, Image } from 'react-bootstrap';
import Highlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';
import { log } from 'utilities';

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
            <div onKeyDown={::this.handleKeyDown} tabIndex={0}>
              <Highlighter language='ruby' style={docco}>
                { this.state.code }
              </Highlighter>
            </div>
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
