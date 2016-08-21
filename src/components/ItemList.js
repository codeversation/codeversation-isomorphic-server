import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Item } from 'components';
import { log } from 'utilities';

class ItemList extends Component {
  handleClick() {
    this.props.appendItem();
  }

  componentWillMount() {
    //this.props.appendItem();
  }

  render() {
    log(this.props.items);

    const Items = this.props.items.toJS().map(
      (item, idx) => item // <Item _text={ item } key={ idx } />
    );

    log(Items);

    return (
      <div onClick={ ::this.handleClick }>
        <h2> click me </h2>
        <ul>
          { Items }
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
