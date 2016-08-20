import { combineReducers } from 'redux';
import items from './items';

const reducers = { items };

export { items };
export default combineReducers(reducers);
