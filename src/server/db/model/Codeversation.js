import db from 'server/db';
import CodeversationSchema from 'server/db/schema/Codeversation';

export default db.model('Codeversation', CodeversationSchema);
