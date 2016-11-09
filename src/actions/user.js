import { USER } from '../actionTypes';
import { mapActionFactory } from './factories';
import decode from 'jwt-decode';

const actions = mapActionFactory(USER);

export default {
	...actions,

	login:
		({ email, password }) => dispatch =>
			fetch('http://localhost:3000/api/v1/session',
				{
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						user: { email, password }
					})
				})
				.then((res) => res.json())
				.then((resData) => {
					let user = decode(resData.token);
					dispatch(actions.merge(user));
					dispatch(actions.save(user));
					return resData;
				}),

		load() {
			return actions.merge(JSON.parse(localStorage.getItem("user")));
		},

		save(user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
};
