import mongoose, { Document, Schema } from 'mongoose';


interface IUser extends Document {
  username: string;
  password: string;
  displayName: string;
  email: string;
  joinDate: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String },
  password: { type: String },
  displayName: { type: String },
  email: { type: String },
  joinDate: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);