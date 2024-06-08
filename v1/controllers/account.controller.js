const Account = require("../models/account.model")
const generateHelper = require("../../helpers/generate.helper");
const loginValidate = require("../validates/login.validate");
const accountValidate = require("../validates/account.validate");

const md5 = require("md5");

// [POST] api/v1/user/register
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

    account.password = md5(result.value.password)
    account.token = generateHelper.generateToken(30)

    const record = new Account(account);
    await record.save();
    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!"
    })
  }
}

// [POST] api/v1/user/login
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
      if (existAccount.password != md5(result.value.password)) {
        res.json({
          code: 400,
          message: "Mật khẩu không đúng!"
        })
        return;
      }
      res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: existAccount.token
      })
    }
  } catch (error) {
    res.json({
      code: 400,
      message: error
    })
  }
}


// [GET] api/v1/user/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await Account.findOne({
      _id: id,
      deleted: false
    });
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

// [DELETE] api/v1/user/delete/:id
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


// [PATCH] api/v1/user/edit/:id
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