import db from 'mongoose';

const CommentSchema = new db.Schema({
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
});

/*
if(!CommentSchema.options.toJSON) CommentSchema.options.toJSON = {};
CommentSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};
*/
export default CommentSchema;
