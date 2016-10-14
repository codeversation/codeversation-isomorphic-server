import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>{this.props.user}</h1>
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
