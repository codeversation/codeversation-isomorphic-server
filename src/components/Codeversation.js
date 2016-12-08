import React, { PropTypes, Component } from 'react'
import PostTitle from './PostTitle';
import Snippet from './Snippet';
import Loading from './Loading';
import Post from './Post';
import ShareButton from './ShareButton';
import Sidebar from './Sidebar';
import { Grid, Col, Row, Well, PageHeader } from 'react-bootstrap';
import { ISO_ROOT, V1_API_BASE } from 'config';

class Codeversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      codeversation: {},
			snippetId: this.props.params && this.props.params.snippetId,
    }
  }

	// componentWillRecieveProps(props){
	// 	if(props.params && props.params.snippetId){
	// 		this.setState({snippetId: props.params.snippetId});
	// 	}else{
	// 		fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation/${this.props.params.id}`, {
	//       method: 'GET'
	//     })
	// 		.then(res => res.json())
	// 		.then()
	// 	}
	// }

  componentDidMount() {
    fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation/${this.props.params.id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoading: false,
          codeversation: json,
					snippetId: this.state.snippetId || json._selectedSnippet,
        });
      })
      .catch((err) => {
        console.error(err);
      })

  }

  render() {
    if (this.state.isLoading) {
      return <Loading />
    }
    const { codeversation } = this.state;
    console.log(codeversation);
    return (
      <Grid fluid>
        <PageHeader>
          <Row>
            <Col md={6}>
              {codeversation.title}
            </Col>
            <Col mdOffset={11}>
              <ShareButton {...this.props} />
            </Col>
          </Row>
        </PageHeader>
        <Row>
          <Col md={3}>
            <Sidebar 
              posts={codeversation.snippet}
              original={codeversation}
            />
          </Col>
          <Col md={6}>
            <Well>{codeversation.content}</Well>
            <Post {...this.props } snippetId={this.state.snippetId} />
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Codeversation;
