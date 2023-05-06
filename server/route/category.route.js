const express = require("express");
const router = new express.Router();
const controller = require("../controllers/category.controller");

router.route("/categories").get(controller.getAllCategories);
module.exports = router;
