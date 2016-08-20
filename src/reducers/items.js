import { List } from 'immutable';
import { ITEM } from 'actionTypes';

import { listReducerFactory } from './factories';

console.log(listReducerFactory);

export default listReducerFactory(ITEM);
