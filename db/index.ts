import dbConfig from '../config/db.config';
import mongoose from 'mongoose';
import UserModel from './user';

const db: {
  mongoose: typeof mongoose;
  url: string;
  user: any;
} = {
  mongoose,
  url: dbConfig.url,
  user: UserModel,   
};

export default db;