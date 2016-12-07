import React, { PropTypes, Component } from 'react';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import CodeversationPreview from './CodeversationPreview';
import { ISO_ROOT, V1_API_BASE } from 'config';
import { log } from 'utilities';

class PostHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCodeversations: [],
			fetching: false,
			invalidated: true,
    };
  }

	isValid(){
		log('start');
		log(this.state);
		log(!this.state.invalidated);
		log(!!this.state.profileCodeversations);
		log(this.state.profileCodeversations
		.reduce((valid, codeversation) => {
			log(valid);
			log('user id' + this.props.user.id);
			log('creator id', codeversation._creator.id);
			return (valid && this.props.user.id === codeversation._creator.id)
		}, true));

		return (
			!this.state.invalidated &&
			!!this.state.profileCodeversations &&
			this.state.profileCodeversations
			.reduce((valid, codeversation) => {
				log(valid);
				log('user id' + this.props.user.id);
				log('creator id', codeversation._creator.id);
				return (valid && this.props.user.id === codeversation._creator.id)
			}, true));
	}
  componentDidMount() {
    this.tryFetchData();
  }

  componentDidUpdate() {
    this.tryFetchData();
  }

	tryFetchData() {
		log(this.isValid());
		if(!this.state.fetching && !this.isValid()){
			this.fetchData();
		}
	}

	fetchData() {
		this.setState({ fetching: true });
    fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation`)
      .then(res => res.json())
      .then((codeversations) => {
        this.setState({
          profileCodeversations: codeversations.filter(codeversation => codeversation._creator.id === this.props.user.id),
					fetching: false,
					invalidated: false,
        })
      })
      .catch(err => console.error('Couldn\'t retrieve codeversations', err));
  }

	handleDelete(){
		log('handling delete');
		this.setState({ invalidated: true });
	}

	handleDelete(){
		log('handling delete');
		this.setState({ invalidated: true });
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
            if(!codeversation.public && (this.props.user.id !== codeversation._creator.id)){
              return;
            } else {
              return (
                <CodeversationPreview
                  key={ind}
                  style={style}
                  codeversation={codeversation}
                  user={this.props.user}
									onDelete={::this.handleDelete}
                />
              );
            }
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
