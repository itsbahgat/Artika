const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;


const authenticateUser = (request, response, next)=>{
    let token = request.get("Authorization");
    console.log(token);
    next();
}

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