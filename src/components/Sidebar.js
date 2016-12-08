import React, { PropTypes, Component } from 'react';
import { Grid, Col, Row, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';

class Sidebar extends Component {
  render() {
  const { original, posts } = this.props;
    return (
      <div>
        <h2>Answers</h2>
        <Nav 
          bsStyle='pills' 
          stacked
          activeKey={1}
        >
          <NavItem href={`/view/${original.id}`} eventKey={1}>{original.title}</NavItem>
          {do{
            posts.map((post, ind) => {
              return (
                <NavItem href='/' key={ind} eventKey={ind+2}>{post.name}</NavItem>
              );
            })
          }}
        </Nav>
      </div>
    );
  }
}

Sidebar.propTypes = {
  posts: PropTypes.array.isRequired,
  original: PropTypes.object.isRequired
}

export default Sidebar;
