import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Profile extends Component {
	listUserInfo() {
		let user = this.props.user;

		return Object.keys(user)
		.map(key =>
			<ListGroupItem header={user[key]} key={key}>{key}</ListGroupItem>
		);

	}

  render() {
    const user = this.props.user;
    user.posts = ['hello', 'world'];
    return (
      <div>
				<ListGroup>
					{this.listUserInfo()}
				</ListGroup>
        <h1>Recent Posts</h1>
        {user.posts.map((post, index) => <Item _text={post} key={index} />)}
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({user: user.toJS()});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
