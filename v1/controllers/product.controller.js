const Product = require("../models/product.model")

// [GET] /api/v1/products/
module.exports.list = async (req, res) => {
  try {
    const products = await Product.find({
      deleted: false
    })
    res.json({
      code: 200,
      products: products
    })
  } catch {
    res.json({
      code: 400,
      message: "Lấy thông tin sản phẩm không thành công!"
    })
  }
}

// [GET] /api/v1/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: false
    })
    if (!product) {
      res.json({
        code: 200,
        message: "Sản phẩm đã bị xóa!"
      })
    } else {
      res.json({
        code: 200,
        product: product
      })
    }
  } catch {
    res.json({
      code: 400,
      message: "Lấy thông tin sản phẩm không thành công!"
    })
  }
}

// [POST] /api/v1/products/create
module.exports.create = async (req, res) => {
  try {
    req.body.discountPercentage = 0;
    if (req.body) {
      req.body.price = parseInt(req.body.price);
      req.body.discountPercentage = parseInt(req.body.discountPercentage);
      req.body.stock = parseInt(req.body.stock);
    }
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countProduct = await Product.countDocuments({});
      req.body.position = countProduct + 1;
    }

    const product = new Product(req.body);
    await product.save();

    res.json({
      code: 200,
      message: "Tạo mới sản phẩm thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}

// [PATCH] /api/v1/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne({
      _id: id
    }, req.body)
    res.json({
      code: 200,
      message: "Cập nhật sản phẩm thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}

// [PATCH] /api/v1/products/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.updateOne({
      _id: id
    }, {
      deleted: true
    })
    res.json({
      code: 200,
      message: "Xóa sản phẩm thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}