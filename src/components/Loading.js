import React, { Component, PropTypes } from 'react';

class Loading extends Component {
  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
  }

  static defaultProps = {
    text: 'Loading',
    speed: 100
  }

  constructor(props) {
    super(props);
    this.originalText = props.text;
    this.state = {
      text: this.originalText
    };
  }

  componentDidMount() {
    const stopper = this.originalText + '...';
    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({
          text: this.originalText
        });
      } else {
        this.setState({
          text: this.state.text + '.'
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default Loading;
