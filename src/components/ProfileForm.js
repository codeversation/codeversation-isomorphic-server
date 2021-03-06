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
import { log } from 'utilities';
import { user as userActions } from 'actions';
import Loading from './Loading';

class ProfileForm extends Component {

	constructor(...args) {
		super(...args);

		this.state = {
			editable: false,
		};
	}

	isLocalUser() {
		return this.props.localUser && this.props.user.id === this.props.localUser.id
	}


	displaySaveOrLoadButton() {
		return this.state.editable ?
			(<FormGroup>
				<Col smOffset={2} sm={10}>
					<Button type="submit" onClick={::this.handleSaveClick}>
						Save
					</Button>
				</Col>
			</FormGroup>)
		 :
			(<FormGroup>
				<Col smOffset={2} sm={10}>
					<Button type="submit" onClick={::this.handleEditClick}>
						Edit
					</Button>
				</Col>
			</FormGroup>)
		;
	}

	displayLogoutButton() {
		return <FormGroup>
				<Col smOffset={2} sm={10}>
					<Button type="submit" onClick={::this.handleLogoutClick}>
						Logout
					</Button>
				</Col>
			</FormGroup>
		;
	}


	displayButtons() {
		return this.isLocalUser() ?
			<div>
				{this.displaySaveOrLoadButton()}
				{this.displayLogoutButton()}
			</div>
		:
			undefined
		;
	}

	render() {
		let user;

		if(this.isLocalUser()){
			user = this.props.localUser;
		}else {
			user = this.props.user;
		}

		{
			let { name, id, email } = user;
			user = { name, id, email };
		}

		return (<Form horizontal>
					{this.state.editable ?
						(<div>
					 <FormGroup controlId="formHorizontalName">
						 <Col componentClass={ControlLabel} sm={2}>
							 Name
						 </Col>
						 <Col sm={10}>
							 <FormControl
								type="text"
								placeholder={user.name}
								onChange={this.handleFormChange('name')}
								 />
						 </Col>
					 </FormGroup>

						<FormGroup controlId="formHorizontalEmail">
						 <Col componentClass={ControlLabel} sm={2}>
							 Email
						 </Col>
						 <Col sm={10}>
							 <FormControl type="email"
								placeholder={user.email}
								onChange={this.handleFormChange('email')} />
						 </Col>
						</FormGroup>

					 <FormGroup controlId="formHorizontalPassword">
						 <Col componentClass={ControlLabel} sm={2}>
							 Password
						 </Col>
						 <Col sm={10}>
							 <FormControl
								type="password"
								placeholder="Password"
								onChange={this.handleFormChange('password')} />
						 </Col>
					 </FormGroup>
					 </div>)
				 :
					 <ListGroup>
						 {
							 Object.keys(user)
							 .map(key =>
								 <ListGroupItem header={user[key]} key={key}>{key}</ListGroupItem>
							 )
						 }
					 </ListGroup>}

					 {
						 this.displayButtons()
					 }
				 </Form>)
		;
	}

	handleLogoutClick(ev) {
		ev.preventDefault();

		this.props.logoutUser();
	}
	handleEditClick(ev) {
		ev.preventDefault();

		this.setState({ editable: !this.state.editable });
	}

	handleSaveClick(ev) {
		ev.preventDefault();

		this.props.updateUser({
			...this.state.newUser,
			token: this.props.localUser.token,
		})
		.catch(err => log)
		;

		this.setState({ editable: !this.state.editable });
	}

	handleFormChange(key) {

		return (ev) => {
			this.setState({ newUser: { ...this.state.newUser, [key]: ev.currentTarget.value} })
		}
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => ({
	updateUser: newUser => dispatch(userActions.update(newUser)),
	logoutUser: () => dispatch(userActions.clear()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
