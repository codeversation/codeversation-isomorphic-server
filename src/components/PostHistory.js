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
		let valid = nextProps.userId === this.props.userId;

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
        console.log(codeversations);
        this.setState({
          profileCodeversations: codeversations.filter(codeversation => codeversation._creator.id === this.props.userId),
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
                user={user}
                />
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

PostHistory.propTypes = {
  userId: PropTypes.string.isRequired
}

export default PostHistory;