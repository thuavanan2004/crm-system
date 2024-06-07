const Customer = require("../models/customer.model")

// [GET] /api/v1/customers/
module.exports.index = async (req, res) => {
  const customers = await Customer.find({
    deleted: false
  })
  res.json({
    code: 200,
    customers
  })
}

// [POST] /api/v1/customers/create
module.exports.create = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json({
      code: 200,
      message: "Tạo mới khách hàng thành công!",
      customer: customer
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}


// [PATCH] /api/v1/customers/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.updateOne({
      _id: id
    }, req.body)
    res.json({
      code: 200,
      message: "Cập nhật thông tin khách hàng thanh công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}


// [GET] /api/v1/customers/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({
      _id: id,
      deleted: false
    })
    res.json({
      code: 200,
      customer: customer
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}

// [DELETE] /api/v1/customers/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.deleteOne({
      _id: id
    })
    res.json({
      code: 200,
      message: "Xóa thông tin khách hàng thành công!"
    })
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}