import * as Joi from 'joi';

export const reserveValidation = Joi.object({
  start_date: Joi.date().required().messages({
    'any.required': 'start date is required',
    'date.base': 'The date must be in year/month/day or year-month-day format',
  }),
  end_date: Joi.date().required().messages({
    'any.required': 'end date is required',
    'date.base': 'The date must be in year/month/day or year-month-day format',
  }),
  car_id: Joi.string().required().messages({
    'any.required': 'car id is required',
    'string.base': 'The car id must be in string format',
  }),
});
