
const jwt = require('jsonwebtoken');
const cloudinary  =  require("../config/cloudinary");
const Users = require('../models/customer.model');
const Seller = require('../models/seller.model');

const privateKey = process.env.JWT_SECRET;
const expiryTimeInSeconds = process.env.JWT_EXPIRATION_TIME;

const register = async (req, res) => {
  try {       
    const { role } = req.body;
    let newCustomer;

    if (role === "seller") {
      newCustomer = await Seller.create({ ...req.body });
    } else {
      newCustomer = await Users.create({ ...req.body });
    }

    if (req.file) {
      const upload = await cloudinary.v2.uploader.upload(req.file.path);
      newCustomer.avatar = upload.secure_url;
      await newCustomer.save();
    }

    const token = createToken(newCustomer.id);
    res.cookie('jwt', token, { httpOnly: true, expiryTime: expiryTimeInSeconds });
    res.status(201).json({ message: 'Created Successfully', data: newCustomer });    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await Users.login(emailOrUsername, password);
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      expiryTime: expiryTimeInSeconds,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { expiryTime: 1 });
  res.redirect("/");
};

const createToken = (id) => {
  //const userRole =
  return jwt.sign({ id }, privateKey, { expiresIn: expiryTimeInSeconds });
};

module.exports = {
  register,
  login,
  logout,
};
