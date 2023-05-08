const productModel = require("../models/product.model");
module.exports.getAllCategories = async (req, res, next) => {
  const allCategories = await productModel
    .find()
    .distinct("categories")
    .catch((error) => {
      next(error);
    });
  res.status(200).json(allCategories);
  // console.log("cats====");
  // console.log(allCategories);
};
