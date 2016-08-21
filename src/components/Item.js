import React, { Component } from 'react';

export class Item extends Component {
  render() {
    return (<li> { this.props._text } </li>);
  }
};
