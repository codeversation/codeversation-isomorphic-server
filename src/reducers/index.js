import { combineReducers } from 'redux';

// import partial reducers
export { default as items } from './items';

// import all partial reducers as `reducers`
import * as reducers from 'reducers';

// export after using helper object to partition state
export default combineReduceders(reducers);
