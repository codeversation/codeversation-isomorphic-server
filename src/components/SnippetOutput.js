import React, { PropTypes, Component } from 'react'
import { Button } from 'react-bootstrap';

const SnippetOutput = ({ output }) => { 
    return (
      <div>
        <h2>{this.props.code}</h2>
        <button>run</button>
      </div>
    );
};

SnippetOutput.propTypes = {
  output: PropTypes.string.isRequired
}


export default SnippetOutput;
