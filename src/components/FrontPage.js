import React, { PropTypes, Component } from 'react';
import Loading from './Loading';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      codeversations: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/codeversation')
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
    const { codeversations } = this.state;
    return (
      <div>
        <h1>
          FrontPage
        </h1>
        <ListGroup>
            {codeversations.map((codeversation, ind) => {
              const style = ind % 2 ? {background: 'grey'} : null;
              return (
                <ListGroupItem 
                  key={ind} 
                  header={codeversation.title}
                  style={style}
                >
                  {codeversation._creator.email}
                </ListGroupItem>
              );
            })}
          </ListGroup>
      </div>
    );
  }
}

export default FrontPage;
