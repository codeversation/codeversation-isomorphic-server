import { List } from 'immutable';
import { USER } from 'actionTypes';

import { mapReducerFactory } from './factories';

export default
	mapReducerFactory(
		USER,
		{
			save: user => localStorage.setItem("user", JSON.stringify(user)),
			load: user => user.merge(JSON.parse(localStorage.getItem("user"))),
		}
	);
