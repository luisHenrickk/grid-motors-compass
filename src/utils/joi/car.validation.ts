import * as Joi from 'joi';

export const carValidation = Joi.object({
  model: Joi.string().required().messages({
    'any.required': 'Model is required',
    'string.base': 'The model must be in string format',
  }),
  color: Joi.string().required().messages({
    'any.required': 'Color is required',
    'string.base': 'The color must be in string format',
  }),
  year: Joi.string()
    .regex(/^(19[5-9]\d|20[0-2]\d|2023)$/)
    .required()
    .messages({
      'any.required': 'Year is required',
      'string.base': 'The year must be a valid year in string format',
      'string.pattern.base': 'Year must be a valid four-digit year and between 1950 and 2023',
    }),
  value_per_day: Joi.number().required().messages({
    'any.required': 'Value per day is required',
    'number.base': 'The value per day must be in number format',
  }),
  accessories: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required().messages({
          'any.required': 'Accessories description is required',
          'string.empty': 'Accessories description cannot be an empty field',
          'string.base': 'The accessories description must be in number format',
        }),
      })
        .min(1)
        .required()
        .messages({
          'any.required': 'At least one accessory must be provided',
          'array.min': 'At least one accessory must be provided',
        }),
    )
    .required()
    .unique((a, b) => a.description === b.description)
    .messages({
      'any.required': 'Accessories is required',
      'array.base': 'The accessories must be in the form of an array of objects',
      'array.unique': 'Accessories should not contain duplicate values',
    }),
  number_of_passengers: Joi.number().required().messages({
    'any.required': 'Number of passengers is required',
    'number.base': 'The Number of passengers must be in number format',
  }),
});
