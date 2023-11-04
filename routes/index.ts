import express from 'express';
import s from './swagger';
import userRouter from './users';
import setsRouter from './sets';

const baseRouter = express.Router();

baseRouter.use('/', s);
baseRouter.use('/user',userRouter ); 
baseRouter.use('/sets', setsRouter);

export default baseRouter;