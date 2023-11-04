import dbConfig from '../config/db.config';
import mongoose from 'mongoose';
import UserModel from './user';
import SetModel from './sets'

const db: {
  mongoose: typeof mongoose;
  url: string;
  user: any;
  sets: any;
} = {
  mongoose,
  url: dbConfig.url,
  user: UserModel,
  sets: SetModel   
};

export default db;