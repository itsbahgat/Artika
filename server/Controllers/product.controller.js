const productModel = require('../models/product.model');
 
    //for all
    let getAllProducts = async (req, res) => {
        try {
        const allProducts = await productModel.find();
        res.status(200).json(allProducts);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    };
    //for all
    let getProductById = async (req, res) => {
        try {
            const product = await productModel.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };
    //for all
    let getProductsByCategory = async (req, res) => {
        try {
            const categories = req.params.categories.split(","); // Split the categories string into an array
            const products = await productModel.find({ categories: { $in: categories } });
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };
    let getProductsByTitle = async (req, res) => {
        try {
            const products = await productModel.find({ title: { $regex: req.params.title, $options: 'i' } });
            res.status(200).json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };
    
    //for seller 
    let addNewProduct = async (req, res) => {
        try {
        if (true){ //add validation function here
            const product = new productModel({
                title : req.body.title,
                description : req.body.description,
                price : req.body.price,
                categories : req.body.categories,
                images : req.body.images,
                seller : req.body.seller
                //don't let seller to add reviews
                });
            const newProduct = await product.save();
            res.status(201).json({ message: "Created Successfully", data: newProduct });
        }
        else{
            res.status(400).json({ message: "Invalid Data" });
        }
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    };
    //for seller
    let updateProductById = async (req, res) => {
        try {
        if (true){ //add validation function here
            const product = await productModel.findById(req.params.id);
            if (product) {

                product.title = req.body.title || product.title;
                product.description = req.body.description || product.description;
                product.price = req.body.price || product.price;
                product.categories = req.body.categories || product.categories;
                product.images = req.body.images || product.images;
                product.seller = req.body.seller || product.seller;
                product.reviews = req.body.reviews || product.reviews;
    
            const updatedProduct = await product.save();
            res.status(200).json({ message: "Updated Successfully", data: updatedProduct });
            } else {
            res.status(404).json({ message: "invalid data" });
            }
        }else{
            res.status(400).json({ message: "Invalid Data" });
        }
    
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
    };
    //for seller
    let deleteProductById = async (req, res) => {
            const id = req.params.id;
            productModel.deleteOne({ _id: id }).then(()=>{
            res.status(200).json({ message: "Deleted Successfully" });
        }).catch((error)=>{
            res.status(500).json({ message: error.message });
        });
    };
    //for customer
    let addReviewProductById = async (req, res) => {
        try {
        if (true){ //add validation function here
            const product = await productModel.findById(req.params.id);
            if (product) {
                product.reviews.push(req.body);
                const updatedProduct = await product.save();
                res.status(200).json({ message: "Updated Successfully", data: updatedProduct });
            } else {
            res.status(404).json({ message: "invalid data" });
            }
        }else{
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
    addReviewProductById
  };