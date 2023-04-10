import { Request, Response, NextFunction } from 'express';
import { createUserValidation, updateUserValidation } from '../utils/joi/user.validation';
import { BadRequestError } from '../utils/api-errors';

export const createUserValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = createUserValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};

export const updateUserValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = updateUserValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};
