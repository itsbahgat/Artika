/**
 * @file Manages authentication using JWT tokens.
 * @module Authentication
 */

const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

/**
 * Middleware function to authenticate the user.
 * @param {Object} request - The HTTP request object.
 * @param {Object} response - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const authenticateUser = (request, response, next) => {
  let token = request.get("Authorization");
  console.log(token);
  next();
}

/**
 * Middleware function to authenticate the JWT token.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) 
    return res.redirect('/login');

  jwt.verify(token, privateKey, (err, decodedToken) => {
    if (err) {
      return res.redirect('/login');
    }

    next();
  });
};

module.exports = {
  authenticateToken
}
