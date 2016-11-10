import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { user } from 'actions';
import { log } from 'utilities';

import 'isomorphic-fetch';
class App extends Component {
	componentDidMount() {
		this.props.loadUser();
	}

   render() {
    return (
      <div>
        <Header {...this.props}/>
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
