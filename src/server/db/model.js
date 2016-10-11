import mongoose from 'mongoose';
import { UserSchema } from './schema';

export const User = mongoose.model('User', UserSchema);
