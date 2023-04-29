const mongoose = require("mongoose");

//~ The status could be "pending," "shipped," "delivered," or "cancelled."
//    enum: ['customer', 'seller', 'admin'],

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