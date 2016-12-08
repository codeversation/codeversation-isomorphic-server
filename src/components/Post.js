import React, { PropTypes, Component } from 'react';
import Snippet from './Snippet';
import SnippetOutput from './SnippetOutput';
import CommentList from './CommentList';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { ISO_ROOT, V1_API_BASE } from 'config';
import { log } from 'utilities';
import { connect } from 'react-redux';

const rowStyle = {
	marginBottom: '10px'
}

class Post extends Component {
	constructor(...args) {
		super(...args);

		this.state = {
			snippet: { code: '', title: '' },
			readOnly: this.props.readOnly !== null ? this.props.readOnly : true,
		}
	}

	componentDidMount(){
		fetch(`${ISO_ROOT}${V1_API_BASE}/snippet/${this.props.snippetId}`, {
      method: 'GET'
    })
		.then(res => res.json())
		.then(json => {
			log(json);
			this.setState({
				snippet: json,
			});
		});
	}

	componentWillReceiveProps(){
		fetch(`${ISO_ROOT}${V1_API_BASE}/snippet/${this.props.snippetId}`, {
      method: 'GET'
    })
		.then(res => res.json())
		.then(json => {
			log(json);
			this.setState({
				snippet: json,
			});
		});
	}


	handleFork() {
		this.context.router.push(`/fork/${this.props.params.id}/${this.props.snippetId}`);
	}

  render() {
    return (
      <Grid>
				<Row>
					<Col md={8} >
		        <Snippet
							snippet={this.state.snippet}
							snippetId={this.props.snippetId}
							readOnly={this.state.readOnly}
							onChange={code => this.setState({ snippet: { code } })}
						/>
					</Col>
					<Col md={4}>
						<Row style={rowStyle}>
							<SnippetOutput snippet={this.state.snippet.code}/>
						</Row>
						<Row>
							<Col md={4}>
								<Button bsStyle='success' onClick={::this.handleFork}>
									Fork
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
        <CommentList id={this.props.snippetId} />

				<Row style={rowStyle}>
					<ButtonToolbar>
						<Button bsStyle='primary'>
							Post
						</Button>
					</ButtonToolbar>
				</Row>
      </Grid>
    );
  }
}

Post.contextTypes = {
  router: PropTypes.object.isRequired
}

Post.propTypes = {
  snippetId: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
}

Post.defaultProps = {
	readOnly: null,
};


const mapStateToProps = ({user}) => ({ localUser: user.toJS() });

export default connect(
  mapStateToProps,
)(Post);
