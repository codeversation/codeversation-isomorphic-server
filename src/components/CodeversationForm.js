import React, { PropTypes, Component } from 'react'
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import FormFieldGroup from './FormFieldGroup';
import Snippet from './Snippet'
import SnippetOutput from './SnippetOutput';
//redux
import { user } from 'actions';

class CodeversationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      code: ''
    }
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value})
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value})
  }

  handlePostCodeversation() {
    const codeversation = {
      title: this.state.title,
      content: this.state.body,
      public: true,
      _creator: this.props.user.toJS().id
    }
    console.log(this.state.code);
    if (this.state.code !== '') {
      codeversation.snippet = {
          title: 'Original',
          code: this.state.code,
          correct: false,
        }

    }
    fetch('/api/v1/codeversation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        codeversation
        })
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json);
        console.log(this);
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
            value={this.state.title}
            onChange={this.handleTitleChange.bind(this)}
          />
          <FormFieldGroup
            label='Codeversation Body'
            type='text'
            value={this.state.body}
            onChange={this.handleBodyChange.bind(this)}
          />
        </form>
        <Snippet
          code={this.state.code}
          readOnly={false}
          onChange={code => this.setState({code})}
        />
        <SnippetOutput snippet={this.state.code}/>

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

const mapStateToProps = ({ user }) => ({ user });
const mapStateToDispatch = dispatch => ({});
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(CodeversationForm);
