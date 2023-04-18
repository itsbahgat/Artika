const route = require('express').Router();


const routeModel = require('../models/customer.model')

route.post('/register', (req, res, next) => { //next : to pass the next middleware   
    console.log(req.body)
    routeModel.register(req.body.userName, req.body.email, req.body.password,req.body.gender,req.body.birthday)
        .then((custom) => res.status(200).json({ custom: custom, msg: "registered" }))
        .catch((err) => res.status(400).json({ error: err }))
})

route.post('/login', (req, res, next) => { //next : to pass the next middleware   
    console.log(req.body)
    routeModel.login(req.body.email, req.body.password)
        .then((token) => res.status(200).json({ token:token }))
        .catch((err) => res.status(400).json({ error: err }))
})




module.exports = route;