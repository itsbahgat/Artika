const express = require("express");
const route = new express.Router();
const seller = require("../controllers/seller.controller");

/* route.get("/all", seller.getAllSellers);
route.get("/allpending", seller.getAllPendingSellers);
route.put("/sellerapprove/:id", seller.sellerApprove);

route.route("/:id").get(seller.getSellerById).delete(seller.deleteSellerById);

 */
const controller = require("../controllers/seller.controller");

// route.post("/seller/update-orders", controller.updateOrders);
route.route("/seller").get(controller.GetAllSellers);
// get all carts for all sellers

route
  .route("/seller/:sellerId")
  .get(controller.GetSellerOrders)
  .delete(controller.DeleteSellerById);

route.route("/seller/:sellerId/:state").get(controller.GetSellerOrdersByState);


module.exports = route;
