import { Router } from 'express';
import userController from '../controllers/userController';

export const userRouter = Router();

userRouter.get('/', userController.findAll);
userRouter.get('/:id', userController.findById);
userRouter.post('/', userController.create);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.delete);
