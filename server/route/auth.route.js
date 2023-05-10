const route = require("express").Router();
const authController = require("../controllers/auth.controller");
const { userValidationRules, validate } = require("../middlewares/validation.mw");
const upload = require("../middlewares/fileUpload.mw");


route.route("/register")
     .post(upload.single('avatar'),
           userValidationRules(),
           validate,
           
           authController.register);


route.post('/login',  
    authController.login
)


module.exports = route;