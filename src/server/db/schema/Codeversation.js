import db from 'mongoose';

const CodeversationSchema = new db.Schema({
  _id: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true
  },
  snippet: {
    type: Number,
    ref: 'Snippet'
  }
});


if(!CodeversationSchema.options.toJSON) CodeversationSchema.options.toJSON = {};
CodeversationSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CodeversationSchema;
