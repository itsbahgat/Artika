const express = require("express");
const router = new express.Router();
const ProductController = require("../Controllers/product.controller");

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.get("category/:category", ProductController.getProductById);

router.post("/", ProductController.addNewProduct);

router.put("/:id", ProductController.updateProductById);

router.delete("/:id", ProductController.deleteProductById);

router.put("/review/:id", ProductController.addReviewProductById);


module.exports = router;