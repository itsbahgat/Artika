const express = require("express");
const route= new express.Router();
const controller = require("../controllers/customer.controller");

route.get("/all", controller.getAllCustomers);

route.route("/:id")
    .get(controller.getCustomerById)
    .put(controller.editCustomerById)
    .delete(controller.deleteCustomerById);

module.exports = route;