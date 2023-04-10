import { Router } from 'express';
import carController from '../controllers/carController';
import { createCarValidationMiddleware, updateCarValidationMiddleware } from '../middlewares/carValidationMiddleware';
import authController from '../controllers/authController';

export const carRouter = Router();

carRouter.get('/', carController.findAll);
carRouter.get('/:id', carController.findById);
carRouter.post('/', authController.protect, createCarValidationMiddleware, carController.create);
carRouter.delete('/:id', authController.protect, carController.delete);
carRouter.put('/:id', authController.protect, updateCarValidationMiddleware, carController.update);
carRouter.patch('/:carId/accessories/:accessoryId', authController.protect, carController.updateAccessory);
