import { List } from 'immutable';
import { ITEM } from 'common/redux/actionTypes';

import { listReducerFactory } from 'common/redux/actions/factories';

export default listReducerFactory(ITEM);
