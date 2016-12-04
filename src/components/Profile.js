import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import {
	ListGroup,
	ListGroupItem,
 	Form,
	FormGroup,
	Col,
	ControlClass,
	ControlLabel,
	FormControl,
	Button,
	PageHeader,
} from 'react-bootstrap';
import { log, error } from 'utilities';
import { ISO_ROOT, V1_API_BASE } from 'config';
import { user as userActions } from 'actions';
import isEmpty from 'lodash/isEmpty';
import PostHistory from './PostHistory';
import Loading from './Loading';
import ProfileForm from './ProfileForm';

class Profile extends Component {
	constructor(...args){
		super(...args);

		this.state = {
			fetching: false,
		};
	}

	isValid(){
		return (this.state.user && this.props.params.id === this.state.user.id);
	}

	componentWillMount() {
		this.tryFetching();
	}

	componentDidUpdate() {
		this.tryFetching();
	}

	tryFetching(){
		if(!this.state.fetching && !this.isValid()){
			fetch(`${ISO_ROOT}${V1_API_BASE}/user/${this.props.params.id}`)
		  .then(data => data.json())
			.then(json => json.user)
			.then(user => {
				log(user);
				this.setState({
					fetching: false,
					user,
				});
			})
			.catch(err => error(err));

			this.setState({ fetching: true });
		}
	}

  render() {
    return (
      <div>
				<PageHeader>
					Profile Page
				</PageHeader>
				{ do {
					if(!this.isValid() && this.state.fetching){
						<Loading />;
					}else if(!this.isValid() && !this.state.fetching){
						<h2> FAILED </h2>;
					} else {
						<ProfileForm
							user={this.state.user}
							localUser={this.props.localUser}
						/>;
					}
				} }
				<PostHistory user={this.state.user}/>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({ localUser: user.toJS() });

export default connect(
  mapStateToProps,
)(Profile);
