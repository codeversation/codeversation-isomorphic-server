import 'source-map-support/register';
import 'babel-polyfill';

import app from './app';
import { log } from 'utilities';

var server = app.listen(3030, function () {
  var host = server.address().address;
  var port = server.address().port;

  log('Listening at http://%s:%s', host, port);
});
