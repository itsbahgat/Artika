const express = require("express");
const router = express.Router({ strict: true });
const controller = require("../controllers/carts.controller");
const {updateCartValidationRules,deleteCartValidationRules,searchCartValidationRules,validate} = require("../middlewares/validation.mw");


router.route("/cart")
      .get(controller.GetAllCarts)     // get all carts for all users
    // add item to cart, recieve customerId and item
    .post(
     //inputValidation,
     validate,
     controller.AddItem) //^ works

    // recieve custId, prodId and whether to decrease quantity or remove totally 
    .put(updateCartValidationRules(), validate,  controller.RemoveItem) 
        
    // recieve custId and whether to checkout(make the cart to be an order) or clear totally 
    //empty the cart
    //checkout
    .delete(//deleteCartValidationRules(), validate,
     controller.DeleteCart)
    

router.route("/cart/:id")
      .get(searchCartValidationRules(), validate,controller.GetCartByCustId) 

module.exports = router;