const Joi = require('joi');

const customerValidationSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập first name'
    }),
  lastName: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập last name'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập email',
      'string.email': 'Vui lòng nhập đúng định dạng email'
    }),
  phone: Joi.string(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    postalCode: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),
  company: Joi.string().optional(),
  jobTitle: Joi.string().optional(),
  notes: Joi.string().optional(),
  status: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': 'Status must be either "active" or "inactive"'
    }),
  deleted: Joi.boolean().default(false)
});

module.exports = (data) => customerValidationSchema.validate(data, {
  abortEarly: false
});