import { Request, Response, NextFunction } from 'express';
import { carValidation } from '../utils/joi/car.validation';
import { BadRequestError } from '../utils/api-errors';

export const createCarValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = carValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};
