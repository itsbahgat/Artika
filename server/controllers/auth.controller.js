const jwt = require('jsonwebtoken');
const Users = require('../models/customer.model');
const Seller = require('../models/seller.model');

/**
 * The private key used for JWT signing.
 * @type {string}
 */
const privateKey = process.env.JWT_SECRET;

/**
 * The expiration time for JWT tokens in seconds.
 * @type {number}
 */
const expiryTimeInSeconds = process.env.JWT_EXPIRATION_TIME;

/**
 * Registers a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the registration is successful or rejects with an error.
 */
const register = async (req, res) => {
  try {
    /**
     * The role of the user.
     * @type {string}
     */
    const { role } = req.body;
    let newCustomer;
    if (role === 'seller') {
      newCustomer = await Seller.create({ ...req.body });
    } else {
      newCustomer = await Users.create({ ...req.body });
    }

    /**
     * The JWT token for the newly registered user.
     * @type {string}
     */
    const token = createToken(newCustomer.id);
    res.cookie('jwt', token, { httpOnly: true, expiryTime: expiryTimeInSeconds });
    res.status(201).json({ message: 'Created Successfully', data: newCustomer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Authenticates a user and generates a JWT token.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the login is successful or rejects with an error.
 */
const login = async (req, res) => {
  try {
    /**
     * The email or username of the user.
     * @type {string}
     */
    const { emailOrUsername, password } = req.body;
    const user = await Users.login(emailOrUsername, password);

    /**
     * The JWT token for the logged-in user.
     * @type {string}
     */
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, expiryTime: expiryTimeInSeconds });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

/**
 * Logs out a user by clearing the JWT token cookie.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the logout is successful.
 */
const logout = async (req, res) => {
  res.cookie('jwt', '', { expiryTime: 1 });
  res.redirect('/');
};

/**
 * Creates a JWT token for a user.
 * @param {string} id - The user ID.
 * @returns {string} The JWT token.
 */
const createToken = (id) => {
  //const userRole =
  return jwt.sign({ id }, privateKey, { expiresIn: expiryTimeInSeconds });
};

module.exports = {
  register,
  login,
  logout,
};
