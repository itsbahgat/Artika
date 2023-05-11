const jwt = require("jsonwebtoken");
const Admins = require("../models/admin.model");

const privateKey = process.env.JWT_SECRET;
const expiryTimeInSeconds = process.env.JWT_EXPIRATION_TIME;

const register = async (req, res) => {
  try {
    // Add "approved" field with default value of false
    const newUser = { ...req.body };

    const newCustomer = await Admins.create(newUser);
    console.log("register requist", newCustomer);
    // const newCustomer = await Users.create({
    //   ...req.body
    // });
    const token = createToken(newCustomer.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      expiryTime: expiryTimeInSeconds,
    });
    res
      .status(201)
      .json({ message: "Created Successfully", data: newCustomer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const admin = await Admins.login(emailOrUsername, password);
    const token = createToken(admin.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      expiryTime: expiryTimeInSeconds,
    });
    res.status(200).json(admin);
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

let getAllAdmins = async (req, res) => {
  try {
    const allCustomers = await Admins.find();
    res.status(200).json(allCustomers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllAdmins,
};
