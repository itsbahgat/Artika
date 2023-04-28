// const mongoose = require("./DBconnection");

// console.log(mongoose);
const mongoose = require("mongoose");
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/artecaDB");


// create schema object 

//~ The status could be "pending," "shipped," "delivered," or "cancelled."

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number
    }],
    status: String,
    total: Number
  });

module.exports = mongoose.model("orders", orderSchema);
