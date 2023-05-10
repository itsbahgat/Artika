const mongoose = require('mongoose');
const user = require('./customer.model');
const bcrypt = require('bcrypt');


const sellerSchema = new mongoose.Schema({
    ...user.schema.obj,
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

sellerSchema.pre('save', async function (next){
  if (!this.isModified('password')) 
  return next();

  let salt = await bcrypt.genSalt(); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
  });
  
module.exports = mongoose.model('Seller', sellerSchema);
