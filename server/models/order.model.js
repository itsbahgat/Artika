const mongoose = require("mongoose");

//~ The status could be "pending", "accepted", "rejected", "shipped", "delivered" or "cancelled."
//    enum: ['customer', 'seller', 'admin'],

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
      sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
      sellerStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});


module.exports = mongoose.model("orders", orderSchema);
