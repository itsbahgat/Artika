const mongoose = require("mongoose");

//~ The status could be "pending", "accepted", "rejected", "shipped", "delivered" or "cancelled."
//    enum: ['customer', 'seller', 'admin'],

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
  },

  total: Number,
});

module.exports = mongoose.model("orders", orderSchema);
