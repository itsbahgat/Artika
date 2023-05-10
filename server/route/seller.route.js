const express = require("express");
// const route = new express.Router();
const router = express.Router({ strict: true });
const controller = require("../controllers/seller.controller");

// route.post("/seller/update-orders", controller.updateOrders);
router.route("/seller").get(controller.GetAllSellers);
// get all carts for all sellers

router
  .route("/seller/:sellerId")
  .get(controller.GetSellerOrders)
  .delete(controller.DeleteSellerById);

router.route("/seller/:sellerId/:state").get(controller.GetSellerOrdersByState);
module.exports = router;
