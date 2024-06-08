const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string()
    .required()
    .message({
      'string.empty': "Vui lòng nhập tiêu đề"
    }),
  price: Joi.number()
    .greater(0)
    .required()
    .messages({
      'number.base': 'Giá phải là số',
      'number.greater': 'Giá phải lớn hơn 0',
      'number.empty': 'Vui lòng nhập giá'
    }),
  discountPercentage: Joi.number()
    .min(0)
    .max(100)
    .default(0)
    .messages({
      'number.base': 'Phần trăm giảm giá phải là số ',
      'number.min': 'Phần trăm giảm giá phải lớn hơn 0',
      'number.max': 'Phần trăm giảm giá phải nhỏ 100'
    }),
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Stock phải là số',
      'number.integer': 'Stock phải là kiểu nguyển',
      'number.min': 'Stock phải lớn hơn 0',
      'number.empty': 'Vui lòng nhập số lượng còn lại'
    }),
})

const productValidate = (data) => {
  return productSchema.validate(data);
}

module.exports = productValidate;