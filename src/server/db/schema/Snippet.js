import mongoose, { Schema } from 'mongoose';
import db from 'mongoose';

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
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  _codeversation: {
    type: Schema.Types.ObjectId,
    ref:'Codeversation'
  }

});

if(!SnippetSchema.options.toJSON) SnippetSchema.options.toJSON = {};
SnippetSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default SnippetSchema;
