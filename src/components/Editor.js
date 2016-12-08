import { env } from 'utilities';
import React, { Component, PropTypes } from 'react';

if(env() === 'browser') {
  var brace = require('brace');
  var AceEditor = require('react-ace').default;

  require('brace/mode/ruby');
  require('brace/mode/java');

  require('brace/theme/kuroir');
	require('brace/theme/github');
	require('brace/theme/tomorrow');
	require('brace/theme/twilight');
	require('brace/theme/xcode');
	require('brace/theme/textmate');
	require('brace/theme/solarized_dark');
	require('brace/theme/solarized_light');
	require('brace/theme/terminal');
	require('brace/theme/monokai');

}

class Editor extends Component {
	render() {
		return (
			env() === 'browser' ?
				(<AceEditor
					mode={this.props.language}
					theme={this.props.theme}
					name={this.props.editorName}
					width="100%"
					height="250px"
					onChange={this.props.onChange}
					editorProps={{$blockScrolling: true}}
					readOnly={this.props.readOnly}
					value={this.props.code}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
				/>)
			:
				<div/>
		);
	}
}

Editor.defaultProps = {
	language: 'javascript',
	theme: 'github',
	onChange: () => {},
	value: '',
	readOnly: false,
};

Editor.propTypes = {
	editorName: PropTypes.string.isRequired,
	language: PropTypes.string,
	theme: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	readOnly: PropTypes.bool,
};

export default Editor;
