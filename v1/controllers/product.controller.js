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
  const result = productValidate(req.body);
  if (result.error) {
    res.status(400).json({
      code: 400,
      message: result.error.details.map(err => err.message)
    });
    return;
  }

  try {
    const productData = result.value;

    if (!productData.position) {
      const countProduct = await Product.countDocuments({});
      productData.position = countProduct + 1;
    } else {
      productData.position = parseInt(productData.position);
    }

    const product = new Product(productData);
    await product.save();

    res.json({
      code: 200,
      message: "Tạo mới sản phẩm thành công!"
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Tạo mới sản phẩm không thành công!",
      error: error.message
    });
  }
}

// [PATCH] /api/v1/products/edit/:id
module.exports.edit = async (req, res) => {
  const result = productValidate(req.body);
  if (result.error) {
    res.status(400).json({
      code: 400,
      message: result.error.details.map(err => err.message)
    });
    return;
  }

  try {
    const id = req.params.id;
    const updatedProduct = await Product.updateOne({
      _id: id
    }, result.value);

    if (!updatedProduct) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy sản phẩm cần cập nhật"
      });
    } else {
      res.json({
        code: 200,
        message: "Cập nhật sản phẩm thành công!"
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Cập nhật sản phẩm không thành công!",
      error: error.message
    });
  }
}

// [PATCH] /api/v1/products/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.updateOne({
      _id: id
    }, {
      deleted: true
    });

    if (!deletedProduct) {
      res.status(404).json({
        code: 404,
        message: "Không tìm thấy sản phẩm cần xóa"
      });
    } else {
      res.json({
        code: 200,
        message: "Xóa sản phẩm thành công!"
      });
    }
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "Xóa sản phẩm không thành công!",
      error: error.message
    });
  }
}