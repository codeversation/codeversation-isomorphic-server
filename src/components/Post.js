import React, { PropTypes, Component } from 'react';
import Snippet from './Snippet';
import SnippetOutput from './SnippetOutput';
import CommentList from './CommentList';
import { Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';

const rowStyle = {
	margin: '0 0 10px 0'
}

class Post extends Component {
	constructor(...args) {
		super(...args);

		this.state = {
			code: '',
		}
	}

  render() {
    return (
      <Grid>
				<Row>
					<Col md={8} >
		        <Snippet
							id={this.props.snippetId}
							readOnly={this.props.readOnly}
							code={this.state.code}
							onChange={code => this.setState({code})}
						/>
					</Col>
					<Col md={4}>
						<SnippetOutput snippet={this.state.code}/>
					</Col>
				</Row>
        <CommentList snippetId={this.props.snippetId}/>

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

Post.propTypes = {
  snippetId: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
}

Post.defaultProps = {
	readOnly: false,
};

export default Post;
