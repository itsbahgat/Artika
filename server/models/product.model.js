const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/artecaDB");

//2)Create Schema
const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    categories: [{
        type: String,
        required: true
      }],
    images: [{
      type: String,
      required: true
    }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: false
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
  });
  

//3)Connect Schema With Collection
module.exports = mongoose.model("products",productSchema);


