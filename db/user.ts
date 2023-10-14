import mongoose, { Document, Schema } from 'mongoose';


interface IUsers extends Document {
  username: string;
  password: string;
  displayName: string;
  email: string;
  joinDate: string;
}

const UsersSchema: Schema = new Schema({
  username: { type: String },
  password: { type: String },
  displayName: { type: String },
  email: { type: String },
  joinDate: { type: String },
});

export default mongoose.model<IUsers>('Users', UsersSchema);