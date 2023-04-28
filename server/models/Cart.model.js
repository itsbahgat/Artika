const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers', unique: true},
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        quantity: Number
    }]
})

module.exports = mongoose.model("carts", cartSchema);