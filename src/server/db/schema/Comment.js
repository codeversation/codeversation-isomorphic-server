import mongoose, { Schema } from 'mongoose';
import db from 'mongoose';
import mongooseDeepPopulate from 'mongoose-deep-populate';
const deepPopulate = mongooseDeepPopulate(db);

const CommentSchema = new db.Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _codeversation: {
    type: Schema.Types.ObjectId,
    ref:'Codeversation'
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
  dateCreated: {
    type: Date,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref:'Comment'
  }]
});

CommentSchema.plugin(deepPopulate);

if(!CommentSchema.options.toJSON) CommentSchema.options.toJSON = {};
CommentSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default CommentSchema;
