import React, { PropTypes, Component } from 'react';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import CodeversationPreview from './CodeversationPreview';
import { ISO_ROOT, V1_API_BASE } from 'config';

class PostHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCodeversations: [],
			fetching: false,
			invalid: true,
    };
  }

	componentWillReceiveProps(nextProps) {
		let valid = nextProps.user.id === this.props.user.id;

		if(valid){
			this.setState({
				invalid: false,
			});
		}
	}

  componentDidMount() {
		this.tryFetchData();
  }

	componentDidUpdate() {
		this.tryFetchData();
	}

	tryFetchData() {
		if(!this.state.fetching && this.state.invalid){
			this.fetchData();
		}
	}

	fetchData() {
    fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation`)
      .then(res => res.json())
      .then((codeversations) => {
        this.setState({
          profileCodeversations: codeversations.filter(codeversation => codeversation._creator.id === this.props.user.id),
					fetching: false,
        })
      })
      .catch(err => console.error('Couldn\'t retrieve codeversations', err));
	}

  render() {
    return (
      <div>
        <PageHeader>
          History
       </PageHeader>
        <ListGroup>
          {this.state.profileCodeversations.map((codeversation, ind) => {
            const style = ind % 2 ? { background: '#f2f2f2' } : null;
            return (
              <CodeversationPreview
                key={ind}
                style={style}
                codeversation={codeversation}
                user={this.props.user}
                />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

PostHistory.propTypes = {
  user: PropTypes.object.isRequired
}

export default PostHistory;