import express from 'express';
import s from './swagger';
import userRouter from './users';

const baseRouter = express.Router();

baseRouter.use('/', s);
baseRouter.use('/users',userRouter ); 

export default baseRouter;