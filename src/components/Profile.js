import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Item from './Item';

class Profile extends Component {
  render() {
    const user = this.props.user.toJS();
    console.log(this.props);
    user.posts = ['hello', 'world'];
    return (
      <div>
        <Header username={user.name}/>
        <h1>Recent Posts</h1>
        {user.posts.map((post, index) => <Item _text={post} key={index} />)}
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
