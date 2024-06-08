const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'any.required': "Vui lòng nhập tiêu đề sản phẩm"
    }),
  description: Joi.string()
    .required()
    .messages({
      'any.required': "Vui lòng nhập mô tả sản phẩm"
    }),
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Giá sản phẩm phải là số',
      'number.min': 'Giá sản phẩm phải lớn hơn hoặc bằng 0',
      'any.required': 'Vui lòng nhập giá sản phẩm'
    }),
  discountPercentage: Joi.number()
    .min(0)
    .max(100)
    .default(0)
    .messages({
      'number.base': 'Phần trăm giảm giá phải là số ',
      'number.min': 'Phần trăm giảm giá phải lớn hơn hoặc bằng 0',
      'number.max': 'Phần trăm giảm giá phải nhỏ hơn hoặc bằng 100'
    }),
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'Số lượng hàng tồn kho phải là số',
      'number.integer': 'Số lượng hàng tồn kho phải là kiểu nguyên',
      'number.min': 'Số lượng hàng tồn kho phải lớn hơn hoặc bằng 0',
      'any.required': 'Vui lòng nhập số lượng hàng tồn kho'
    }),
  thumbnail: Joi.string().uri(),
  status: Joi.string()
    .valid('available', 'unavailable')
    .default('available')
    .messages({
      'any.only': 'Trạng thái sản phẩm không hợp lệ'
    }),
  position: Joi.number().integer(),
  slug: Joi.string(),
  deleted: Joi.boolean().default(false),
  featured: Joi.string().valid('0', '1').default('0'),
  phone: Joi.string()
    .pattern(/^0[0-9]{9,10}$/)
    .messages({
      'string.pattern.base': 'Định dạng số điện thoại không hợp lệ'
    })
});

const productValidate = (data) => {
  return productSchema.validate(data);
}

module.exports = productValidate;