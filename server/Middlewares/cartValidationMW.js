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


// module.exports.inputValidation = [
//     // body('customerId').isAlpha().withMessage('customer id should be mongoID'),
//     // body('productId').isAlpha().withMessage('items should be an object'),
//     // body('items.productId').isMongoId().withMessage('productId should be a valid MongoDB ObjectId')
// ];

// module.exports.updateValidation = [
//     body('customerId').isMongoId().withMessage('customer id should be mongoID'),
//     body('productId').isMongoId().withMessage('product id should be mongoID'),
//     body('deleteItem').isBoolean().withMessage('deleteItem should be an bool')
// ];

// module.exports.deleteValidation = [
//     body('customerId').isMongoId().withMessage('customer id should be mongoID'),
//     body('checkout').isBoolean().withMessage('checkout should be an bool')
// ];

// module.exports.searchValidation = [
//     param('id').isMongoId().withMessage('customer id should be mongoID')
// ];