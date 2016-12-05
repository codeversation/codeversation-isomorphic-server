import mongoose, { Schema } from 'mongoose';
import db from 'mongoose';
import mongooseDeepPopulate from 'mongoose-deep-populate';
import tree from 'mongoose-tree';
const deepPopulate = mongooseDeepPopulate(db);


const SnippetSchema = new db.Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    required: true,
    default: false
  },
  dateCreated: {
    type: Date,
    required: true
  },
  root: {
    type: boolean,
    required: true
  },
  _codeversation: {
    type: Schema.Types.ObjectId,
    ref:'Codeversation'
  }
});

SnippetSchema.plugin(deepPopulate);
SnippetSchema.plugin(tree);

if(!SnippetSchema.options.toJSON) SnippetSchema.options.toJSON = {};
SnippetSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default SnippetSchema;
