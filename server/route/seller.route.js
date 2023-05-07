const express = require("express");
const route = new express.Router();
const seller = require("../controllers/seller.controller");

route.get("/all", seller.getAllSellers);
route.get("/allpending", seller.getAllPendingSellers);
route.put("/sellerapprove/:id", seller.sellerApprove);

route.route("/:id").get(seller.getSellerById).delete(seller.deleteSellerById);

module.exports = route;
