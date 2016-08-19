import { SERVER_ROOT } from '../config'
import express from 'express';
import React from 'react';
import Router from  'react-router';
import { match } from 'react-router';

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

import routes from '../routes';

app.get('/js/app.js', (req, res) => {
  res.sendFile(SERVER_ROOT + '/app.js');
});

app.get('/*', (req, res) => {

});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
