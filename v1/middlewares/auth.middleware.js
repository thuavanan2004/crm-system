const Account = require("../models/account.model");


module.exports.requireAuth = async (req, res, next) => {
    if (!req.headers.authorization.split(" ")[1]) {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm token!"
        })
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const existAccount = await Account.findOne({
        token: token,
        deleted: false
    }).select("fullName email")

    if (!existAccount) {
        res.json({
            code: 400,
            message: "Token không hợp lệ!"
        })
        return;
    }
    res.locals.user = existAccount;
    next();
}