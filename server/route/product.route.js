const express = require("express");
const router = new express.Router();
const ProductController = require("../Controllers/product.controller");

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.get("/category/:categories", ProductController.getProductsByCategory);

router.get("/title/:title", ProductController.getProductsByTitle);

router.post("/", ProductController.addNewProduct);

router.put("/:id", ProductController.updateProductById);

router.put("/review/:id", ProductController.addReviewProductById);

router.delete("/:id", ProductController.deleteProductById);



module.exports = router;