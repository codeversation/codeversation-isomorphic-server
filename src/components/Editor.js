import { env } from 'utilities';
import React, { Component } from 'react';

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

	//console.log(<AceEditor/>);
	// AceEditor.editor.setReadOnly(true);
}

class Editor extends Component {
	render() {
		return (
			env() === 'browser' ?
				(<AceEditor
					mode={this.props.language}
					theme={this.props.theme}
					name="code_form"
					width="100%"
					height="250px"
					onChange={this.props.onChange}
					editorProps={{$blockScrolling: true}}
					readOnly={true}
					value={this.props.code}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
				/>)
			:
				<div/>
		);
	}
}

export default Editor;
