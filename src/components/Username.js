import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Username extends Component {
  render() {
    const { user } = this.props;
    return (
      <Link 
        to={`/profile/${user.id}`} 
      >
        <p>{user.email}</p>
      </Link>
    );
  }
}

Username.propTypes = {
  user: PropTypes.object.isRequired
};

export default Username;
