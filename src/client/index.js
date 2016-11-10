import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import routes from 'routes';
import reducer from 'reducers';
import { $ } from 'client/utilities';
import { decodeStore, log } from 'utilities';
import thunk from 'redux-thunk';

const initialState = decodeStore($('#initialReduxStateJSON').innerText);
const store = createStore(
	reducer,
	initialState,
	applyMiddleware(thunk),
);

render((
    <Provider store={ store }>
      <Router routes={ routes } history={ browserHistory } />
    </Provider>
  ),
  $('#reactOutput')
);
