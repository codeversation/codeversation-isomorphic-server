import mongoose from 'mongoose';
import { log } from 'utilities';
log('running db index.');

// set default mongoose promise lib.  could be bluebird.
mongoose.Promise = Promise;

import { DB_URI } from 'server/config';
let db = mongoose.createConnection(DB_URI);

export default db;
