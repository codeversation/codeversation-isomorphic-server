import React, { PropTypes, Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { COMPILER, V1_API_BASE } from 'config';
import { Opal } from 'opal-npm-wrapper';

class SnippetOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: 'Click run to see your code\'s output!',
      isCompiling: false
    }
  }

  handleRunSnippet() {
    this.setState({
      isCompiling: true
    });

    fetch(`${COMPILER}v1/api/ruby`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: this.props.snippet
      })
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (json.js) {
          this.setState({
            output: eval(json.js),
            isCompiling: false
          });
        } else {
          this.setState({
            output: json.message,
            isCompiling: false
          })
        }
      })
      .catch((err) => {
        this.setState({
          isCompiling: false,
          output: 'Error'
        });
        console.log(err);
      });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={1}>
            <Button
              style={{marginBottom: '10px'}}
              disabled={this.state.isCompiling}
              onClick={!this.state.isCompiling ? this.handleRunSnippet.bind(this) : null}>
              {this.state.isCompiling ? 'Compiling...' : 'Run'}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <textarea
              value={this.state.output}
              readOnly
            />
          </Col>
        </Row>
      </Grid>
    ); } }
SnippetOutput.propTypes = {
  snippet: PropTypes.string.isRequired
}

export default SnippetOutput;
