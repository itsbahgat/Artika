const productModel = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

/**
 * Retrieves all products.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find();
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Retrieves products by categories.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProductsByCategory = async (req, res) => {
  try {
    const categories = req.params.categories.split(",");
    const products = await productModel.find({
      categories: { $in: categories },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieves products by title.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProductsByTitle = async (req, res) => {
  try {
    const products = await productModel.find({
      title: { $regex: req.params.title, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Adds a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addNewProduct = async (req, res) => {
  try {
    const product = new productModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categories: req.body.categories,
      seller: req.body.seller,
    });

    const uploadPromises = req.files.map((file) =>
      cloudinary.v2.uploader.upload(file.path)
    );
    const uploads = await Promise.all(uploadPromises);
    const imageUrls = uploads.map((upload) => upload.secure_url);
    product.images = imageUrls;

    const newProduct = await product.save();
    res
      .status(201)
      .json({ message: "Created Successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Updates a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    let isNotFound = error.name === "CastError";
    if (isNotFound) res.status(404).json({ message: "Product is not found" });
    else res.status(400).json({ message: error.message });
  }
};

/**
 * Deletes a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    await productModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Adds a review to a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addReviewProductById = async (req, res) => {
  try {
    if (true) {
      // Add validation function here
      const product = await productModel.findById(req.params.id);
      if (product) {
        product.reviews.push(req.body);
        const updatedProduct = await product.save();
        res
          .status(200)
          .json({ message: "Updated Successfully", data: updatedProduct });
      } else {
        res.status(404).json({ message: "Invalid data" });
      }
    } else {
      res.status(400).json({ message: "Invalid Data" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByTitle,
  addNewProduct,
  updateProductById,
  deleteProductById,
  addReviewProductById,
};
