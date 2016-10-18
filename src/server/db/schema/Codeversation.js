import db from 'mongoose';

const CodeversationSchema = new db.Schema({
  title: String,
  content: String,
  public: Boolean
});


if(!CodeversationSchema.options.toJSON) CodeversationSchema.options.toJSON = {};
CodeversationSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CodeversationSchema;
