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
    }
  });

module.exports = mongoose.model('Seller', sellerSchema);
