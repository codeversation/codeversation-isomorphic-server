import { USER } from '../actionTypes';
import { mapActionFactory } from './factories';
import decode from 'jwt-decode';
import { log } from 'utilities';
import { ISO_ROOT, V1_API_BASE } from 'config';

const actions = mapActionFactory(
	USER,
	{
		load() {},
		save() {},
	},
);

export default
	{
		...actions,
		login({ email, password }) {
			return (dispatch) => fetch(`${ISO_ROOT}${V1_API_BASE}/session`,
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
				.then(res => res.json())
				.then(resData => ({ ...decode(resData.token), token: resData.token }))
				.then(user => {
					dispatch(actions.merge(user));
					dispatch(actions.save());
					return user;
				})
			;
		},
		update: ({ email, password, name, token }) =>
			dispatch =>
				fetch(`${ISO_ROOT}${V1_API_BASE}/user`,
					{
						method: 'PUT',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
							'Authorization': token,
						},
						body: JSON.stringify({ user: { email, password, name } }),
					})
					.then(res => res.json())
					.then(({ user }) => dispatch(actions.merge(user)))
		,
	}
;
