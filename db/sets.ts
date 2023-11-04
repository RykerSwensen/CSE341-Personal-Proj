import mongoose, { Document, Schema } from 'mongoose';


interface ISets extends Document {
  setName: string;
  startDate: string;
  endDate: string;
}

// Define the schema
const SetsSchema: Schema = new Schema({
  setName: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});

// Create the model and export it
export default mongoose.model<ISets>('Sets', SetsSchema);