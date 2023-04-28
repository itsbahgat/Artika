const jwt = require("jsonwebtoken");

module.exports=(request, response, next)=>{
    let token = request.get("Authorization");
    console.log(token);
    next();
}

