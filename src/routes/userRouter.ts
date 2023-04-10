import { Router } from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';
import {
  createUserValidationMiddleware,
  updateUserValidationMiddleware,
} from '../middlewares/userValidationMiddleware';

export const userRouter = Router();

userRouter.get('/', authController.protect, userController.findAll);
userRouter.get('/:id', authController.protect, userController.findById);
userRouter.post('/', createUserValidationMiddleware, userController.create);
userRouter.patch('/:id', authController.protect, updateUserValidationMiddleware, userController.update);
userRouter.delete('/:id', authController.protect, userController.delete);
