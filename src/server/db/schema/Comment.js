import db from 'mongoose';

const CommentSchema = new db.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  compiledSnippet: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true
  }
});


if(!CommentSchema.options.toJSON) CommentSchema.options.toJSON = {};
CommentSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CommentSchema;
