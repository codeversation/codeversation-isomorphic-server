import React, { Component } from 'react';
// import { Link } from 'react-router';

class App extends Component {
  state = {
    text: 'Hello Universe',
    subtext: 'now with browser',
  }

  handleClick() {
    this.setState({
      text: 'something else',
    });

    this.context.router.push('/list');
  }

  render() {
    return (
      <div>
        <h1 onClick={ ::this.handleClick }>
          { this.state.text }
        </h1>
        <h3> { this.state.subtext } </h3>

        { this.props.children }
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default App;
