const route = require('express').Router();


const routeModel = require('../models/admin.model')

route.post('/register', (req, res, next) => { //next : to pass the next middleware   
    console.log(req.body)
    routeModel.register(req.body.userName, req.body.email, req.body.password)
        .then((ad) => res.status(200).json({ ad: ad, msg: "registered" }))
        .catch((err) => res.status(400).json({ error: err }))
})

route.post('/login', (req, res, next) => { //next : to pass the next middleware   
    console.log(req.body)
    routeModel.login(req.body.email, req.body.password)
        .then((token) => res.status(200).json({ token:token }))
        .catch((err) => res.status(400).json({ error: err }))
})




module.exports = route;