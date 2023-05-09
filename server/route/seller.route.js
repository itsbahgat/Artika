const express = require("express");
const route= new express.Router();
const controller = require("../controllers/seller.controller");

route.post("/seller/update-orders", controller.updateOrders);


module.exports = route;