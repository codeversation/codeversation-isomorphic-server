import 'source-map-support/register';
import 'babel-polyfill';
import 'ignore-styles';

import app from 'server/app';
import { log } from 'utilities';
import db from 'server/db';

db.once('open', () => {
  let server = app.listen(3030, function () {
    let host = server.address().address;
    let port = server.address().port;

    log('* LISTENING *');
    log('Listening at http://%s:%s', host, port);
  });
});
