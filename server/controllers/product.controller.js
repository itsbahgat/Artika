const productModel = require("../models/product.model");
const cloudinary  =  require("../config/cloudinary");


const getAllProducts = async (req, res, next) => {
  const allProducts = await productModel.find().catch((error) => {
    next(error);
  });
  res.status(200).json(allProducts);
};

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

//for all
let getProductsByCategory = async (req, res) => {
  try {
    const categories = req.params.categories.split(","); // Split the categories string into an array
    const products = await productModel.find({
      categories: { $in: categories },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
let getProductsByTitle = async (req, res) => {
  try {
    const products = await productModel.find({
      title: { $regex: req.params.title, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//for seller
let addNewProduct = async (req, res) => {
  try {
    const product = new productModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      categories: req.body.categories,
      seller: req.body.seller,
      // Don't let seller add reviews
    });

    // Handle file upload logic for four images
    const uploadPromises = req.files.map((file) => cloudinary.v2.uploader.upload(file.path));
    const uploads = await Promise.all(uploadPromises);
    const imageUrls = uploads.map((upload) => upload.secure_url);
    product.images = imageUrls;

    const newProduct = await product.save();
    res.status(201).json({ message: "Created Successfully", data: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//for seller
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

//for seller
let deleteProductById = async (req, res) => {
  const id = req.params.id;
  productModel
    .deleteOne({ _id: id })
    .then(() => {
      res.status(200).json({ message: "Deleted Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
//for customer
let addReviewProductById = async (req, res) => {
  try {
    if (true) {
      //add validation function here
      const product = await productModel.findById(req.params.id);
      if (product) {
        product.reviews.push(req.body);
        const updatedProduct = await product.save();
        res
          .status(200)
          .json({ message: "Updated Successfully", data: updatedProduct });
      } else {
        res.status(404).json({ message: "invalid data" });
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
