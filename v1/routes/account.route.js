const express = require("express");
const router = express.Router();

const controller = require("../controllers/account.controller");


router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.delete);

router.patch("/edit/:id", controller.edit);




module.exports = router;