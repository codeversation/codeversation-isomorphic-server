import 'source-map-support/register';
import 'babel-polyfill';

import app from 'server/app';
import { log } from 'utilities';
import PrettyError from 'pretty-error';
import db from 'server/db';

const pe = new PrettyError();

app.use((err, req, res, next) => {
    log(pe.render(err));
    next();
});

db.once('open', () => {
  let server = app.listen(3030, function () {
    let host = server.address().address;
    let port = server.address().port;

    log('* LISTENING *');
    log('Listening at http://%s:%s', host, port);
  });
});
