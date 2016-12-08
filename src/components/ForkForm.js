import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { user } from 'actions';

import Loading from './Loading';
import { Grid, Row, Col, PageHeader, Button, Checkbox } from 'react-bootstrap';
import FormFieldGroup from './FormFieldGroup';
import Snippet from './Snippet'
import SnippetOutput from './SnippetOutput';

import { ISO_ROOT, V1_API_BASE } from 'config';

import { log } from 'utilities';

class ForkForm extends Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      title: '',
				code: '',
				language: '',
				correct: false,
	    };
	  }

		componentDidMount() {
			fetch(`${ISO_ROOT}${V1_API_BASE}/snippet/${this.props.params.snippetId}`)
			.then(res => res.json())
			.then(json => {
				this.setState({ code: json.code, language: json.language });
			});
		}

	  handleTitleChange(e) {
	    this.setState({ title: e.target.value });
	  }

		handlePostFork() {
			fetch(`${ISO_ROOT}${V1_API_BASE}/snippet`, {
	      method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': this.props.user.token,
				},
				body: JSON.stringify({
	        snippet: {
						...this.state,
						_parent: this.props.params.snippetId,
						_codeversation: this.props.params.codeversationId,
					}
	      }),
			})
			.then(res => res.json())
			.then(({ newSnippet }) => newSnippet)
			.then(({ _codeversation, id }) => {
				this.context.router.push(`/view/${_codeversation}/${id}`);
			})
			.catch(err => log.err(err))
		}

		render() {
			return (
	      <Grid>
	        <PageHeader>Create Fork</PageHeader>
	        <form>
	          <FormFieldGroup
	            label='Fork Title'
	            type='text'
	            value={this.state.title}
	            onChange={::this.handleTitleChange}
	          />
	        </form>
	        <Snippet
						snippet={{
							code: this.state.code,
							title: this.state.title,
							correct: this.state.correct,
							_parent: this.props.params.snippetId,
							_codeversation: this.props.params.codeversationId,
						}}
	          readOnly={false}
	          onChange={code => this.setState({ code })}
	        />
	        <SnippetOutput snippet={this.state.code}/>
	        <Button
	          bsStyle='primary'
	          style={{margin: 20}}
	          onClick={::this.handlePostFork}
	        >
	          Post Fork
	        </Button>
	      </Grid>
    	);
		}
}


ForkForm.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({ user: user.toJS() });

export default connect(
  mapStateToProps,
)(ForkForm);
