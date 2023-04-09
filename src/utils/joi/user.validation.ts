import * as Joi from 'joi';
import moment from 'moment';

export const userValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.base': 'The name must be in string format',
  }),
  cpf: Joi.string()
    .required()
    .pattern(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/)
    .messages({
      'any.required': 'CPF is required',
      'string.base': 'The CPF must be in string format',
      'string.pattern.base': 'CPF must be in the format 000.000.000-00',
    }),
  birth: Joi.date().max(moment().subtract(18, 'years').toDate()).required().messages({
    'any.required': 'Birth is required',
    'date.max': 'You must be at least 18 years old to register',
    'date.base': 'The date must be in year/month/day format',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'Email is required',
    'string.email': 'The email must be a valid email address',
    'string.base': 'The email must be in string format',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.base': 'The password must be in string format',
    'string.min': 'Password must contain at least 6 characters',
  }),
  cep: Joi.string()
    .required()
    .pattern(/^[0-9]{5}-[0-9]{3}|[0-9]{8}$/)
    .messages({
      'any.required': 'Cep is required',
      'string.base': 'The cep must be in string format',
      'string.pattern.base': 'Cep must be in the format 000000-000 or 8 digits',
    }),
  qualified: Joi.string().valid('sim', 'não').required().messages({
    'any.required': 'Qualified is required',
    'string.base': 'The qualified must be in string format',
    'any.only': 'Qualified must be sim or não',
  }),
});
