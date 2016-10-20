import { combineReducers } from 'redux';
import items from './items';
import user from './user';

const reducers = { 
  items,
  user
};


export { 
  items,
  user
};
export default combineReducers(reducers);
