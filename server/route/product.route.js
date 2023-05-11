const express = require("express");
const router = new express.Router();
const controller = require("../controllers/product.controller");
const upload = require("../middlewares/fileUpload.mw");


router.route("/")
      .get(controller.getAllProducts)
      .post(upload.array("images", 4), controller.addNewProduct);


router
  .route("/:id")
  .get(controller.getProductById)
  .put(controller.updateProductById)
  .delete(controller.deleteProductById);

router.get("/category/:categories", controller.getProductsByCategory);
router.get("/title/:title", controller.getProductsByTitle);
router.put("/review/:id", controller.addReviewProductById);
router.get("/seller/:seller", controller.getProductsBySellerId);

module.exports = router;
