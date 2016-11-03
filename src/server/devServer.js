import 'source-map-support/register';
import 'babel-polyfill';

import app from 'server/app';
import { log } from 'utilities';
import db from 'server/db';

/*
 * a middleware that checks to see if the error is from react components
 * execution.  if it is, then kill the process and let nodemon wait for a
 * change that might fix the error.  this is needed because without it
 * execution time errors will be frozen in the non-updating server.
 */
app.use((err, req, res, next) => {
	log.err(err);

	res.status(500).json(err);

	if(err.isReact) {
		process.exit(1);
	}
});

db.once('open', () => {
  let server = app.listen(3030, function () {
    let host = server.address().address;
    let port = server.address().port;

    log('* LISTENING *');
    log('Listening at http://%s:%s', host, port);
  });
});
