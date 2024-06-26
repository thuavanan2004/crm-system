const Account = require("../models/account.model")
const bcrypt = require('bcryptjs');
const generateHelper = require("../../helpers/generate.helper");
const loginValidate = require("../validates/login.validate");
const accountValidate = require("../validates/account.validate");


// [POST] api/v1/auth/register
module.exports.register = async (req, res) => {
  const result = accountValidate(req.body);
  if (result.error) {
    console.log(result.error)
    res.json({
      code: 400,
      message: result.error.details[0].message
    })
  } else {
    const existEmail = await Account.findOne({
      email: result.value.email,
      deleted: false
    })
    if (existEmail) {
      res.json({
        code: 400,
        message: "Email đăng ký đã tồn tại"
      })
      return;
    }
    const account = result.value;

    const hashedPassword = await bcrypt.hash(account.password, 10);

    account.password = hashedPassword;
    const record = new Account(account);
    await record.save();

    const token = generateHelper.generateToken(record.id)
    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!",
      token: token
    })
  }
}

// [POST] api/v1/auth/login
module.exports.login = async (req, res) => {
  try {
    const result = loginValidate(req.body);
    if (result.error) {
      res.json({
        code: 400,
        message: "Định dạng không hợp lệ"
      })
    } else {

      const existAccount = await Account.findOne({
        email: result.value.email,
        deleted: false
      })

      if (!existAccount) {
        res.json({
          code: 400,
          message: "Email không tồn tại!"
        })
        return;
      }
      const validPassword = await bcrypt.compare(result.value.password, existAccount.password);
      if (!validPassword) {
        res.json({
          code: 400,
          message: "Mật khẩu không đúng!"
        })
        return;
      }
      const token = generateHelper.generateToken(existAccount.id)
      res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: token
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}


// [GET] api/v1/auth/detail/:id
module.exports.detail = async (req, res) => {

  try {
    const id = req.params.id;
    const account = await Account.findOne({
      _id: id,
      deleted: false
    }).select("-password");
    if (!account) {
      res.json({
        message: "Tài khoản đã bị xóa!"
      })
    }
    res.json({
      code: 200,
      account: account
    })
  } catch (error) {
    res.json({
      code: 400,
      error: error
    })
  }
}

// [DELETE] api/v1/auth/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Account.deleteOne({
      _id: id
    })
    res.json({
      code: 200,
      message: "Xóa tài khoản thành công!",
    })
  } catch (error) {
    res.json({
      code: 400,
      error: error
    })
  }
}


// [PATCH] api/v1/auth/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const exitAccount = await Account.findOne({
      _id: id,
      deleted: false
    });
    if (!exitAccount) {
      res.json({
        message: "Tài khoản không tồn tại!"
      })
      return;
    }
    await Account.updateOne({
      _id: id,
      deleted: false
    }, req.body)
    res.json({
      code: 200,
      message: "Cập nhật thông tin tài khoản thành công"
    })
  } catch (error) {
    res.json({
      code: 400,
      error: error
    })
  }
}