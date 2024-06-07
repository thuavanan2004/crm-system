const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.get("/", controller.list);

router.get("/detail/:id", controller.detail);

router.post("/create", controller.create);

router.patch("/edit/:id", controller.edit);

router.patch("/delete/:id", controller.delete);

module.exports = router;