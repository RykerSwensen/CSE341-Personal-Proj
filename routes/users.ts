import express from 'express';
import userController from '../controller/users';

const userRouter = express.Router();
    userRouter.get('/', userController.getAll);
    userRouter.get('/:username', userController.getUser);
    userRouter.post('/', userController.create);
    userRouter.put('/:username', userController.updateUser);
    userRouter.delete('/:username', userController.deleteUser);

export default userRouter;