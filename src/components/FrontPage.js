import React, { PropTypes, Component } from 'react';
import Loading from './Loading';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CodeversationPreview from './CodeversationPreview';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      codeversations: []
    }
  }
  componentDidMount() {
    fetch('/api/v1/codeversation')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.state.codeversations = json;
        this.setState({
          isLoading: false
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

export default FrontPage;
