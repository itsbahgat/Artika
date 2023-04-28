const { body, validationResult } = require("express-validator");


const validate = (req, res, next) => {
  const errors = validationResult(req);
  const extractedErrors = [];

  if (errors.isEmpty()) return next();
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};


module.exports = {
  userValidationRules,
  validate,
};
