import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user } from 'common/redux/actions';
import { log } from 'utilities';

import 'isomorphic-fetch';
class App extends Component {
	componentDidMount() {
		this.props.loadUser();
	}

   render() {
    return (
      <div>
				<h1> Default Root </h1>
      	{ this.props.children }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

export default connect(
	() => ({}),
  {
		loadUser: user.load,
	}
)(App);
