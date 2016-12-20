import { List } from 'immutable';
import { USER } from 'common/redux/actionTypes';
import { log  } from 'utilities';

import { mapReducerFactory } from './factories';

export default
	mapReducerFactory(
		USER,
		{
			save: user => localStorage.setItem("user", JSON.stringify(user)),
			load: user => user.merge(JSON.parse(localStorage.getItem("user"))),
			clear: user => {
				log(user);
				localStorage.removeItem('user');
				return user.clear();
			}
		}
	);
