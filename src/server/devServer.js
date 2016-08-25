import 'source-map-support/register';
import 'babel-polyfill';

import app from './app';
import { log } from 'utilities';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

app.use(err => {
    log(pr.render(err));
    next();
});

var server = app.listen(3030, function () {
  var host = server.address().address;
  var port = server.address().port;

  log('Listening at http://%s:%s', host, port);
});
