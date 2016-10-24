import React, { PropTypes, Component } from 'react'

class SnippetOutput extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.code}</h2>
        <button>run</button>
      </div>
    );
  }
};

export default SnippetOutput;
