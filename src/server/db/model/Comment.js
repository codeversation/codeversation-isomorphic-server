import db from 'server/db';
import CommentSchema from 'server/db/schema/Comment';
export default db.model('Comment', CommentSchema);
