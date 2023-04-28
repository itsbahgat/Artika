const express = require("express");
const router = new express.Router();
const controller = require("../controllers/product.controller");

router.route("/")
      .get(controller.getAllProducts)
      .post(controller.addNewProduct);

router.route("/:id")
      .get(controller.getProductById)
      .put(controller.updateProductById)
      .delete(controller.deleteProductById);

router.get("/category/:categories", controller.getProductsByCategory);
router.get("/title/:title", controller.getProductsByTitle);
router.put("/review/:id", controller.addReviewProductById);

module.exports = router;