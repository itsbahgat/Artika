const express = require("express");
const router = express.Router({ strict: true });
const {body, param, query, check} = require("express-validator");
const controller = require("../Controllers/OrdersController");
const cartValidationMW = require("../Middlewares/cartValidationMW");

const stateRegex = /^(pending|shipped|delivered|cancelled)$/;

const updateValidation = [
    // body('customerId').isMongoId().withMessage('customer id should be mongoID'),
    body('orderId').isMongoId().withMessage('order id should be mongoID'),
    body('status').isAlpha().matches(stateRegex).withMessage('please check the state')
];

const searchValidation = [
    param('id').isMongoId().withMessage('customer id should be mongoID')
];




router.route("/order")
    // get all carts for all users
    .get(controller.GetAllOrders)  //^ works

    // recieve custId, orderId and new state
    .put(updateValidation, 
        cartValidationMW, 
        controller.UpdateOrder)
    
router.route("/order/:id")
    .get(searchValidation, 
        cartValidationMW, 
        controller.GetOrderByCustId) //^ works

module.exports = router;
