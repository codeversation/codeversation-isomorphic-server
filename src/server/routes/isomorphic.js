import { Router } from 'express';
const router = Router();

import React from 'react';
import { RouterContext, match } from  'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'reducers';
import { item } from 'actions';
import { log } from 'utilities';
import routes from 'routes';

router.get('/*', async (req, res) => {
  match({ routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      if (err) {
        log(err);
        res.status(500).json({ message: 'internal server error' });
      } else if (redirectLocation){
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);

      } else if (renderProps){
        const store = createStore(reducer);

        store.dispatch(item.append('hi from the server'));

        const appRoot = (
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        );

        const reactOutput = renderToString(appRoot);
        const initialReduxStateJSON = JSON.stringify(store.getState());

        res.render('index', { reactOutput, initialReduxStateJSON });

      } else {
        res.status(404).json({ message: 'page not found' });

      }
    })
});

export default router;
