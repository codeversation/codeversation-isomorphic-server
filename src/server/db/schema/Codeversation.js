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
  dateCreated: {
    type: Date,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
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
