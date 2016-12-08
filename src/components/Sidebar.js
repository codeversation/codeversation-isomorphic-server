import React, { PropTypes, Component } from 'react';
import { Grid, Col, Row, Nav, NavItem, Well } from 'react-bootstrap';

class Sidebar extends Component {
  render() {
  const { original, posts } = this.props;
    return (
      <Well>
        <h2>Answers</h2>
        <Nav 
          bsStyle='pills' 
          stacked
        >
          {do{
            posts.map((post, ind) => {
              return (
                <NavItem href={`/view/${post._codeversation}/${post.id}`} key={ind} eventKey={ind+1}>{post.title}</NavItem>
              );
            })
          }}
        </Nav>
      </Well>
    );
  }
}

Sidebar.propTypes = {
  posts: PropTypes.array.isRequired,
  original: PropTypes.object.isRequired
}

export default Sidebar;
