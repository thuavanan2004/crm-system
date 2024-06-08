const Joi = require('joi');

const accountValidationSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập họ tên',
      'string.min': 'Tên phải lớn hơn 3 ký tự',
      'string.max': 'Tên phải nhỏ hơn 50 ký tự'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập email',
      'string.email': 'Vui lòng nhập đúng định dạng email'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Vui lòng nhập password',
      'string.min': 'Mật khẩu phải lớn hơn 6 ký tự'
    }),
  phone: Joi.string(),

  avatar: Joi.string().uri().messages({
    'string.uri': 'Định dạng ảnh không hợp lệ'
  }),

  status: Joi.string()
    .valid('active', 'inactive').messages({
      'any.only': 'Chỉ nhận hai giá trị "active" or "inactive"'
    }),
});

const accountValidate = (data) => {
  return accountValidationSchema.validate(data);
}

module.exports = accountValidate;