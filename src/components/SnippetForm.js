import React, { PropTypes, Component } from 'react'
import SnippetOutput from './SnippetOutput';
import { Grid, Row, Col, Button, ButtonToolbar, Well } from 'react-bootstrap';

import { log, env } from 'utilities';

let brace;
let AceEditor;
let AceWrapper;

const rowStyle = {
	margin: '0 0 10px 0'
}

class Snippet extends Component {
	constructor(props) {
    super(props);

    this.state = {
      code: '',
    };


		if(env() === 'browser') {
		  brace = require('brace');
		  AceEditor = require('react-ace').default;

		  require('brace/mode/ruby');
		  require('brace/mode/java');
		  require('brace/theme/kuroir');

		  AceWrapper = () =>
		    <AceEditor
		      mode="javascript"
		      theme="kuroir"
		      name="code_form"
		      width="100%"
		      height="250px"
					onChange={::this.handleEditorChange}
		      editorProps={{$blockScrolling: true}}
					value={this.state.code}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
		    />
		  ;

		} else {
		  AceWrapper = 'div';
		}

  }


	handleEditorChange(newValue) {
		log(newValue);
		this.setState({ code: newValue });
	};

  render() {
    return (
      <Grid>
        <Row style={rowStyle}>
          <Col>
            <h2> Write your snippet. </h2>
          </Col>
        </Row>
				<Well>
	        <Row style={rowStyle}>
	          <Col md={8}>
	            <AceWrapper/>
	          </Col>
	          <Col md={4} >
	            <SnippetOutput code={this.state.code}/>
	          </Col>
	        </Row>
					<Row style={rowStyle}>
						<Col xs={12}>
							<ButtonToolbar>
								<Button bsStyle='primary'>
									Post
								</Button>
							</ButtonToolbar>
						</Col>
					</Row>
				</Well>
      </Grid>
    );
  }
};

export default Snippet;
