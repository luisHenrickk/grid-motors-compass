import { Router } from 'express';
import CarController from '../controllers/carController';
import carController from '../controllers/carController';

export const carRouter = Router();

carRouter.get('/', CarController.findAll);
carRouter.get('/:id', CarController.findById);
carRouter.post('/', carController.create);
carRouter.delete('/:id', carController.delete);
carRouter.put('/:id', carController.update);
carRouter.patch('/:carId/accessories/:accessoryId', carController.updateAccessory);
