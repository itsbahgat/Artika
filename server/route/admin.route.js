const route = require("express").Router();
const authController = require("../controllers/admin.controller");
const {
  userValidationRules,
  validate,
} = require("../middlewares/validation.mw");

route.post("/register", authController.register);
route.post("/login", authController.login);
route.get("/all", authController.getAllAdmins);

module.exports = route;
