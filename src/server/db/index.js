import mongoose from 'mongoose';

// set default mongoose promise lib.  could be bluebird.
mongoose.Promise = Promise;

// connect to mongodb.
import { DB_URI } from 'server/config';
mongoose.connect(DB_URI);


export default mongoose;
