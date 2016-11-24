import React, { PropTypes, Component } from 'react';
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap';
import CodeversationPreview from './CodeversationPreview';

class PostHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileCodeversations: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/codeversation')
      .then(res => res.json())
      .then((codeversations) => {
        console.log(codeversations);
        this.setState({
          profileCodeversations: codeversations.filter(codeversation => codeversation._creator.id === this.props.userId)
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
