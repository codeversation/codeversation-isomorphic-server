import React, { PropTypes, Component } from 'react';
import Loading from './Loading';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

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
        <ListGroup>
            {codeversations.map((codeversation, ind) => {
              const style = ind % 2 ? {background: '#f2f2f2'} : null;
              return (
                <ListGroupItem 
                  key={ind} 
                  style={style}
                >
                  <Link to={`view/${codeversation.id}`}><h3>{codeversation.title}</h3></Link>
                  <p>{codeversation._creator.email}</p>
                </ListGroupItem>
              );
            })}
          </ListGroup>
      </div>
    );
  }
}

export default FrontPage;
