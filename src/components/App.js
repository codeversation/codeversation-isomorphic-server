import React, { Component } from 'react';
import Header from './Header';
import 'isomorphic-fetch';
class App extends Component {
   render() {
    return (
      <div>
        <Header {...this.props}/>
         { this.props.children }
      </div>
    );
  }
}

export default App;
