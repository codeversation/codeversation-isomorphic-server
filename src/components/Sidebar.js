import React, { PropTypes, Component } from 'react';
import { Grid, Col, Row, Nav, NavItem, Well } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
								<LinkContainer to={`/view/${post._codeversation}/${post.id}`}>
                	<NavItem key={ind} eventKey={ind+1}>{post.title}</NavItem>
								</LinkContainer>
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
