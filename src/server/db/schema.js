import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'server/config';
import { EMAIL_REGEX } from 'config';

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    required: true,
    validate: email => EMAIL_REGEX.test(email),
  },
  password: {
    type: String,
    required: true,
    set: function(pw) {
      this.passwordDigest = bcrypt.syncHash(pw, SALT_ROUNDS);
    }
  },
});

console.log(UserSchema);

//UserSchema.virtual('password').set(function(password){
//});

UserSchema.methods.test = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.passwordDigest, (err, res) => {
      if(err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

if(!UserSchema.options.toJSON) UserSchema.options.toJSON = {};
UserSchema.options.toJSON.transform = (doc, ret) => {
  delete ret.passwordDigest;
  return ret;
};
