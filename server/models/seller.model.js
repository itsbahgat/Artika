const mongoose = require('mongoose');
const user = require('./customer.model');

const sellerSchema = new mongoose.Schema({
    ...user.obj,
    shop: {
      name: String,
      description: String,
      policies: String,
      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      }]
    },
    Orders:[{
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
      items: [{
          productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
          quantity: Number
      }],
      status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending"
      }
    }]
  });

module.exports = mongoose.model('Seller', sellerSchema);
