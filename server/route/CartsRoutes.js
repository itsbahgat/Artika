const express = require("express");
const router = express.Router({ strict: true });
const {body, param, query, check} = require("express-validator");
const controller = require("../Controllers/CartsController");
const cartValidationMW = require("../Middlewares/cartValidationMW");
const authMW = require("../Middlewares/AuthMW");

const inputValidation = [
    // body('customerId').isAlpha().withMessage('customer id should be mongoID'),
    // body('productId').isAlpha().withMessage('items should be an object'),
    // body('items.productId').isMongoId().withMessage('productId should be a valid MongoDB ObjectId')
];

const updateValidation = [
    body('customerId').isMongoId().withMessage('customer id should be mongoID'),
    body('productId').isMongoId().withMessage('product id should be mongoID'),
    body('deleteItem').isBoolean().withMessage('deleteItem should be an bool')
];

const deleteValidation = [
    body('customerId').isMongoId().withMessage('customer id should be mongoID'),
    body('checkout').isBoolean().withMessage('checkout should be an bool')
];

const searchValidation = [
    param('id').isMongoId().withMessage('customer id should be mongoID')
];


router.route("/cart")
    // get all carts for all users
    .get(controller.GetAllCarts) //^ works 

    // add item to cart, recieve customerId and item
    .post(
     inputValidation,
     cartValidationMW,
     controller.AddItem) //^ works

    // recieve custId, prodId and whether to decrease quantity or remove totally 
    .put(updateValidation, 
        cartValidationMW, 
        controller.RemoveItem) //^ works
        
    // recieve custId and whether to checkout(make the cart to be an order) or clear totally 
    //empty the cart
    //checkout
    .delete(deleteValidation, 
            cartValidationMW,
            controller.DeleteCart)
    

router.route("/cart/:id")
    .get(searchValidation, 
        cartValidationMW, 
        controller.GetCartByCustId) //^ works

module.exports = router;