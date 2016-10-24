import React, { PropTypes, Component } from 'react'
import { SnippetOutput, SnippetForm } from 'components';
import {
	Grid,
	Row,
	Col,
} from 'react-bootstrap';

import { log, env } from 'utilities';


const rowStyle = {
	margin: '0 0 10px 0'
}

class Snippet extends Component {
	constructor(props) {
    super(props);

    this.state = {
			code: '',
    };
  }


	handleFormChange(newValue) {
		this.setState({ code: newValue });
	};

  render() {
    return (
      <Grid>
        <Row style={rowStyle}>
          <Col>
            <h2> Compose a Code Snippet </h2>
          </Col>
	      </Row>
        <Row style={rowStyle}>
          <Col md={8}>
						<SnippetForm
							onChange={::this.handleFormChange}
							code={this.state.code}
						/>
          </Col>

          <Col md={4} >
            <SnippetOutput code={this.state.code}/>
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Snippet;
