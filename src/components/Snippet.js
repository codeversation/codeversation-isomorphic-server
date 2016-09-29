import React, { PropTypes, Component } from 'react'
import SnippetOutput from './SnippetOutput';

class Snippet extends Component {
  render() {
    return (
      <div>
        <h2> I am a snippet</h2>
        <SnippetOutput />
      </div> 
    );
  }
};

export default Snippet;
