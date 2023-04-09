import { Request, Response, NextFunction } from 'express';
import { userValidation } from '../utils/joi/user.validation';
import { BadRequestError } from '../utils/api-errors';

export const createUserValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = userValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};
