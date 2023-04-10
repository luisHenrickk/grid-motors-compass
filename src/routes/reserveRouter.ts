import { Router } from 'express';
import reserveController from '../controllers/reserveController';
import authController from '../controllers/authController';

export const reserveRouter = Router();

reserveRouter.get('/', authController.protect, reserveController.findAll);
reserveRouter.get('/:id', authController.protect, reserveController.findById);
reserveRouter.post('/', authController.protect, reserveController.create);
reserveRouter.delete('/:id', authController.protect, reserveController.delete);
reserveRouter.put('/:id', authController.protect, reserveController.update);
