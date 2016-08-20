import React from 'react';
import Router from 'react-router';
import routes from 'routes';
import reducer from 'reducers';

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  const initialStore = JSON.parse(document.getElementById('initialReduxStateJSON').innerText);
  const store = createStore(reducer, initialState);

  React.render((
    <Provider store={store}>
      <Handler />
    </Provider>
  ), document.getElementById('reactOutput'));
});
