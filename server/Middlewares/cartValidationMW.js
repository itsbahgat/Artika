const { validationResult } = require("express-validator");

module.exports = (request, response, next)=>{
    let result = validationResult(request)
    if(!result.isEmpty()){
    const errorMessages = result.errors.reduce((acc, err) => {
        return acc + err.msg + ' ';
    }, '');
    // console.log(errorMessages);
    let error = new Error(errorMessages);
    error.status = 422;
    throw error;
    }
    next();
}