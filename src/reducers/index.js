import { combineReducers } from 'redux';
import items from './items';

const _reducers = { items };

// export after using helper object to partition state
console.log(_reducers);

export { items };
export default combineReducers(_reducers);
