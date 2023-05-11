const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const baseUserSchema = new mongoose.Schema({
  avatar: String,
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
  if (!this.isModified('password')) 
    return next();

   let salt = await bcrypt.genSalt(); 
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

baseUserSchema.statics.login = async function (emailOrUsername, password) {
  const user = await this.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }]});
  if (!user) throw new Error("Incorrect login or password");
  
  const isPasswordValid  = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Incorrect login or password");
  
  return user;
};


module.exports = mongoose.model('Customer', baseUserSchema);