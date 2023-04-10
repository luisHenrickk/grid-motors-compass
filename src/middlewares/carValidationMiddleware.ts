import { Request, Response, NextFunction } from 'express';
import { createCarValidation, updateCarValidation } from '../utils/joi/car.validation';
import { BadRequestError } from '../utils/api-errors';

export const createCarValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = createCarValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};

export const updateCarValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = updateCarValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};
