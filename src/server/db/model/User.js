import mongoose from 'mongoose';
import UserSchema from 'server/db/schema/User';

export default mongoose.model('User', UserSchema);
