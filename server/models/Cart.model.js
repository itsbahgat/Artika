// const mongoose = require("./DBconnection");

// console.log(mongoose);

const mongoose = require("mongoose");
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/artecaDB");


// create schema object 

const cartSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers', unique: true},
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number
    }]
})

module.exports = mongoose.model("carts", cartSchema);