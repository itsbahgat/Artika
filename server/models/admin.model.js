const mongoose = require('mongoose');
const baseUserSchema = require('./customer.model');

const adminSchema = new mongoose.Schema({
    ...baseUserSchema.obj,
    address: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    }
  });
  
module.exports = mongoose.model('admins', adminSchema);

