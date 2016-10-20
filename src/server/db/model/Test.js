//import db from 'server/db';
import db from 'server/db';
import TestSchema from 'server/db/schema/Test';

export default db.model('Test', TestSchema);
