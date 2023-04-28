const route = require("express").Router();
const authController = require("../controllers/auth.controller");
const { userValidationRules, validate } = require("../middlewares/validation.mw");

route.route("/register")
     .post(userValidationRules(),
           validate,
           authController.register);


route.post('/login',  
    authController.login
)


module.exports = route;