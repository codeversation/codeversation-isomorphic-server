import db from 'mongoose';

const SnippetSchema = new db.Schema({
  title: String,
  content: String,
  compiledSnippet: String,
  output: String,
  state: String,
  correct: Boolean
});

export default SnippetSchema;
