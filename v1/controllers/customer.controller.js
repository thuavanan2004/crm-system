const Customer = require("../models/customer.model")
const customerValidate = require("../validates/customer.validate");

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
  const result = customerValidate(req.body);
  if (result.error) {
    res.json({
      code: 400,
      message: result.error.details.map(err => err.message)
    });
  } else {
    const existEmail = await Customer.findOne({
      email: result.value.email,
      deleted: false
    });
    if (existEmail) {
      res.json({
        code: 400,
        message: 'Email đã tồn tại'
      });
      return;
    }

    const customer = new Customer(result.value);
    await customer.save();
    res.status(201).json({
      code: 201,
      message: 'Tạo mới khách hàng thành công'
    });
  }
}


// [PATCH] /api/v1/customers/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const existCustomer = await Customer.findOne({
      _id: id,
      deleted: false
    });
    if (!existCustomer) {
      res.status(404).json({
        message: 'Thông tin khách hàng không tồn tại!'
      });
      return;
    }

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
    if (!customer) {
      res.json({
        code: 404,
        message: "Khách hàng không tồn tại!"
      })
      return;
    }
    res.json({
      code: 200,
      customer: customer
    })
  } catch (error) {
    res.json({
      code: 500,
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
      code: 500,
      message: error
    })
  }
}