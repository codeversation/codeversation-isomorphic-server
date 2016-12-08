import React, { PropTypes, Component } from 'react';
import Loading from './Loading';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CodeversationPreview from './CodeversationPreview';
import { ISO_ROOT, V1_API_BASE } from 'config';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      codeversations: []
    }
  }
  componentDidMount() {
    fetch(`${ISO_ROOT}${V1_API_BASE}/codeversation`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoading: false,
          codeversations: json.reverse()

        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <ListGroup>
          {this.state.codeversations.map((codeversation, ind) => {
            const style = ind % 2 ? {background: '#f2f2f2'} : null;
            if(codeversation.public) {
              return (
                <CodeversationPreview
                  key={ind}
                  style={style}
                  codeversation={codeversation}
                />
              );
            } else {
              return;
            }
          })}
        </ListGroup>
      </div>
    );
  }
}

export default FrontPage;
