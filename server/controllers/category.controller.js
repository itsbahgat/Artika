const productModel = require("../models/product.model");

/**
 * Retrieves all categories.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports.getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await productModel.find().distinct("categories");
    res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};
