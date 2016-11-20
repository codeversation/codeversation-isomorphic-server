import mongoose, { Schema } from 'mongoose';
import db from 'mongoose';

const CommentSchema = new db.Schema({
  _creator: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  content: {
    type: String,
    trim: true,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: "0"
  },
  _codeversation: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'Codeversation'
  },
  dateCreated: {
    type: Date,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  childs:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  }]

});

if(!CommentSchema.options.toJSON) CommentSchema.options.toJSON = {};
CommentSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CommentSchema;
