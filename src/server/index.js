import 'source-map-support/register';
import 'babel-polyfill';
import { SERVER_ROOT } from 'config';
import express from 'express';
import React from 'react';
import Router from  'react-router';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'reducers';

const store = createStore(reducer);
const initialReduxStateJSON = JOSN.stringify(store.getState());

import { createMemoryHistory } from 'history';
const createLocation = createMemoryHistory().createLocation;

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

import routes from '../routes';

app.get('/js/app.js', (req, res) => {
  res.sendFile(SERVER_ROOT + '/app.js');
});

app.get('/*', async (req, res) => {
  match({ routes, location: createLocation(req.url) },
    (err, redirectLocation, renderProps) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
      } else if (redirectLocation){
        app.render('index', { reactOutput })

      } else if (renderProps){
        const appRoot = (
          <Provider store={store}>
            <RouterContext { ...renderProps } />
          </Provider>
        );

        const reactOutput = renderToString(appRoot);
        res.render('index', { reactOutput, initialReduxStateJSON });

      } else {
        res.status(404).json({ message: 'page not found' });

      }
    })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
