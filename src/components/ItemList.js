import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { log } from 'utilities';

class ItemList extends Component {
  handleClick() {
    this.props.appendItem();
  }

  componentWillMount() {
    //this.props.appendItem();
  }

  render() {
    return (
      <div onClick={ ::this.handleClick }>
        <h2> click me </h2>
        <ul>
          { this.props.items.toJS().map(
            (item, idx) => <Item _text={ item } key={ idx } />
          ) }
        </ul>
      </div>
    );
  }
}

import { item } from 'actions';

const mapStateToProps = ({ items }) => ({ items });
const mapDispatchToProps = dispatch => ({
  appendItem(text = 'a default') {
    dispatch(item.append(text));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
