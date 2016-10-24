import { env } from 'utilities';
import React from 'react';

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

export default
	({onChange=() => {}, language='javascript', theme='kuroir', code}) =>
		env() === 'browser' ?
			<AceEditor
				mode={language}
				theme={theme}
				name="code_form"
				width="100%"
				height="250px"
				onChange={onChange}
				editorProps={{$blockScrolling: true}}
				value={code}
				enableBasicAutocompletion={true}
				enableLiveAutocompletion={true}
			/>
		:
			<div />
;
