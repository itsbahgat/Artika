const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const baseUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'seller', 'admin'],
    default:'customer'
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
},
{
  timestamps:true
});

//encrypt password
baseUserSchema.pre('save', async function (next){
  let salt = await bcrypt.genSalt(); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model('Customer', baseUserSchema);