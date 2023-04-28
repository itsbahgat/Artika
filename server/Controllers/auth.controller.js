const jwt = require('jsonwebtoken');
const Users = require('../models/customer.model');

const privateKey = process.env.JWT_SECRET;
const expiryTimeInSeconds = process.env.JWT_EXPIRATION_TIME;


const register = async (req, res) => {
  try {       
    const newCustomer = await Customer.create({
      ...req.body 
    });

    res.status(201).json({ message: 'Created Successfully', data: newCustomer });    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {

  try {
    const {emailOrUsername, password} = req.body;
    let user = await Users.login(emailOrUsername,password);
    res.status(200).json({ id: user.id });
    //return user;
  } 
  catch (error) {
    res.status(401).json({ message: error.message });
 }
};

const createToken = (id) => {
    return jwt.sign({ id }, privateKey, { expiresIn: expiryTimeInSeconds });
  };
  

module.exports = {
    register,
    login
}

