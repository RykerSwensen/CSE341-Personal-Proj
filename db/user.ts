import mongoose, { Document, Schema } from 'mongoose';


interface IUser extends Document {
  username: { 
    type: string,
    required: [true, 'Username is required.']},
  password: {
    type: string,
    required: [true, 'Password is required.']};
  displayName: string;
  email: string;
  joinDate: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String,
    required: [true, 'Username is required.'] },
  password: { type: String,
    required: [true, 'Password is required.']},
  displayName: { type: String },
  email: { type: String },
  joinDate: { type: String },
});

export default mongoose.model<IUser>('User', UserSchema);