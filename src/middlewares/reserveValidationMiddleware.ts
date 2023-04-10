import { Request, Response, NextFunction } from 'express';
import { reserveValidation } from '../utils/joi/reserve.validation';
import { BadRequestError } from '../utils/api-errors';

export const createReserveValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = reserveValidation.validate(req.body);

  if (validationResult.error) {
    next(new BadRequestError(validationResult.error.message));
  }

  next();
};
