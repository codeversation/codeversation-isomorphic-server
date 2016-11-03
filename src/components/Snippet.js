import React, { PropTypes, Component } from 'react'
import { Editor } from 'components';
import {
	Grid,
	Row,
	Col,
	Well,
	FormGroup,
	ControlLabel,
	FormControl,
	Form,
} from 'react-bootstrap';

import { log, env } from 'utilities';

const rowStyle = {
	margin: '0 0 10px 0'
}

class Snippet extends Component {
	constructor(props) {
    super(props);

    this.state = {
			language: 'javascript',
			theme: 'monokai',
    };
  }

	handleLanguageChange(ev) {
		this.setState({ language: ev.currentTarget.value });
	}

	handleThemeChange(ev) {
		this.setState({ theme: ev.currentTarget.value });
	}

	createOptions(options) {
		return options.map(
			(value, idx) =>
				<option value={value} key={idx} >
					{
						// replace _'s with spaces and capitalize each word
						value
							.split('_')
							.map(word =>
								[
									word.slice(0, 1).toUpperCase(),
									word.slice(1).toLowerCase(),
								].join(''))
							.join(' ')
					}
				</option>
		);
	}

  render() {
    return (
			<Well>
				<h2> Snippet </h2>
				<Row style={rowStyle}>
					<Form inline>
						<FormGroup controlId="formControlsSelect">
							<FormControl
								style={{ margin:"0 10px 0" }}
								componentClass="select"
								placeholder="eg. Ruby"
								onChange={ ::this.handleLanguageChange }
							>
								{ this.createOptions([
									'javascript',
									'ruby',
								]) }
							</FormControl>

							<FormControl
								style={{ margin:"0 10px 0" }}
								componentClass="select"
								placeholder="eg. Ruby"
								onChange={ ::this.handleThemeChange }
							>
								{ this.createOptions([
										'monokai',
										'github',
										'tomorrow',
										'kuroir',
										'twilight',
										'xcode',
										'textmate',
										'solarized_dark',
										'solarized_light',
										'terminal',
									]) }
							</FormControl>
						</FormGroup>
					</Form>
				</Row>
				<Row style={rowStyle}>
					<Editor
						code={this.props.code}
						language={this.state.language}
						theme={this.state.theme}
						onChange={this.props.onChange}
						readOnly={this.props.readOnly}
						editorName={'placeholder'}
					/>
				</Row>
			</Well>
    );
  }
};

Snippet.defaultProps = {
	readOnly: false,
};

Snippet.propTypes = {
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	theme: PropTypes.string,
	code: PropTypes.string,
	language: PropTypes.string,
}

export default Snippet;
