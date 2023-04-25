const express = require("express");
const route= new express.Router();
// const routeModel = require('../models/customer.model');
const CustomerController = require("../Controllers/customer.controller");
const { custom } = require("joi");


route.post('/register', (req, res, next) => { //next : to pass the next middleware   
    console.log(custom);
    CustomerController.register(req.body.username, req.body.email, req.body.password,req.body.gender,req.body.birth)
        .then((custom) => res.status(200).json({ custom: custom, msg: "registered" }))
        .catch((err) => res.status(400).json({ error: err }))
    console.log(custom);
})

route.post('/login', (req, res, next) => { //next : to pass the next middleware   
    console.log(req.body)
    CustomerController.login(req.body.email,req.body.password)
        .then((token) => res.status(200).json({ token:token }))
        .catch((err) => res.status(400).json({ error: err }))
})

//get all customers route
route.get("/all", CustomerController.getAllCustomers);

//get cutomer by id route
route.get("/all/:id", CustomerController.getCustomerById);

//delete customer by id
route.delete("/all/:id", CustomerController.deleteCustomerById);

module.exports = route;