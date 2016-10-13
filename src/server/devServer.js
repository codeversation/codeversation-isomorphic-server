import 'source-map-support/register';
import 'babel-polyfill';

import app from 'server/app';
import { log } from 'utilities';
import PrettyError from 'pretty-error';

const pe = new PrettyError();

app.use(err => {
    log(pr.render(err));
    next();
});

let server = app.listen(3030, function () {
  let host = server.address().address;
  let port = server.address().port;

  log('* LISTENING *');
  log('Listening at http://%s:%s', host, port);
});
