import db from 'server/db';

const CodeversationSchema = new db.Schema({
  title: String,
  content: String,
  public: Boolean
});


export default CodeversationSchema;
