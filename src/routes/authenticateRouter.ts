import { Router } from 'express';
import authController from '../controllers/authController';

export const authenticateRouter = Router();

authenticateRouter.post('/', authController.login);
