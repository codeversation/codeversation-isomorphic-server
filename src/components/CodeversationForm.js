import React, { PropTypes, Component } from 'react'
import { Grid, Row, Col, PageHeader, Button, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import FormFieldGroup from './FormFieldGroup';
import Snippet from './Snippet'
import SnippetOutput from './SnippetOutput';
import { ISO_ROOT, V1_API_BASE } from 'config';
//redux
import { user } from 'actions';

class CodeversationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
			codeversation: {
	      public: true,
				title: '',
				content: '',
				snippet: {
		      code: '',
					title: 'Original',
					correct: false,
				},
			},
    }
  }

  handleTitleChange(e) {
    this.setState({ codeversation: { ...this.state.codeversation, title: e.target.value } })
  }

  handleBodyChange(e) {
    this.setState({ codeversation: { ...this.state.codeversation, content: e.target.value } })
  }

  handlePostCodeversation() {
    fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation`, {
      method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': this.props.user.token,
			},
      body: JSON.stringify({
        codeversation: this.state.codeversation,
      }),
    })
      .then(res => res.json())
      .then((json) => {
        this.context.router.push(`/view/${json.codeversation.id}`);

      })
      .catch(err => console.error(err));
  }
  render() {
    return (
      <Grid>
        <PageHeader>Create Codeversation</PageHeader>
        <form>
          <FormFieldGroup
            label='Codeversation Title'
            type='text'
            value={this.state.codeversation.title}
            onChange={this.handleTitleChange.bind(this)}
          />
          <FormFieldGroup
            label='Codeversation Body'
            type='text'
            value={this.state.codeversation.content}
            onChange={this.handleBodyChange.bind(this)}
          />
        </form>
        <Snippet
					snippet={this.state.codeversation.snippet}
          readOnly={false}
          onChange={code => this.setState({ codeversation: { ...this.state.codeversation, snippet: {...this.state.codeversation.snippet, code} } })}
        />
        <Checkbox onClick={() => this.setState({ codeversation: { ...this.state.codeversation, public: !this.state.codeversation.public } })}>
          Private
        </Checkbox>
        <SnippetOutput snippet={this.state.codeversation.snippet.code}/>
        <Button
          bsStyle='primary'
          style={{margin: 20}}
          onClick={this.handlePostCodeversation.bind(this)}
        >
          Post Codeversation
        </Button>
      </Grid>
    );
  }
}

CodeversationForm.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({ user: user.toJS() });
const mapStateToDispatch = dispatch => ({});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(CodeversationForm);
