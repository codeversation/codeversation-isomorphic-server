import db from 'server/db';
import UserSchema from 'server/db/schema/User';

export default db.model('User', UserSchema);
