import mongoose, { Schema } from 'mongoose';
import db from 'mongoose';
import mongooseDeepPopulate from 'mongoose-deep-populate';
const deepPopulate = mongooseDeepPopulate(db);

const CodeversationSchema = new db.Schema({
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
  snippets: [{type:Schema.Types.ObjectId, ref: 'Snippet'}]
});

CodeversationSchema.plugin(deepPopulate);

if(!CodeversationSchema.options.toJSON) CodeversationSchema.options.toJSON = {};
CodeversationSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CodeversationSchema;
