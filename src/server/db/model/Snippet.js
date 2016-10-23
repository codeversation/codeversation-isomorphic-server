import db from 'server/db';
import SnippetSchema from 'server/db/schema/Snippet';

export default db.model('User', SnippetSchema);
