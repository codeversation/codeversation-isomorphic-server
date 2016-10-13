import db from 'server/db';
import { EMAIL_REGEX } from 'config';
import { log } from 'utilities';
import bcrypt from 'bcrypt';

// var beautifyUnique = require('mongoose-beautiful-unique-validation');

const UserSchema = new db.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate: email => EMAIL_REGEX.test(email),
  },
  passwordDigest: {
    type: String,
    required: true,
  },
});

// UserSchema.plugin(beautifyUnique);

UserSchema.methods.authenticate = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.passwordDigest, (err, res) => {
      if(res) {
        resolve(res);
      }
      reject(err);
    });
  });
};

if(!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = (doc, ret) => {
  delete ret.passwordDigest;
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

if(!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.passwordDigest;
  delete ret.__v;
  ret.id = ret._id;
  delete ret._id;

  return ret;
};

export default UserSchema;
