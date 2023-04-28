const { body, validationResult } = require("express-validator");
const Customer = require("../models/customer.model");

const userValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .isAlpha()
      .withMessage("Name should contain only letters!"),

    body("lastName")
      .notEmpty()
      .withMessage("Second Name is required")
      .isAlpha()
      .withMessage("Name should contain only letters!"),

    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 4 })
      .withMessage("Username should be at least 4 charachters!")
      .isAlphanumeric()
      .withMessage("Username should contain only letters and numbers!"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .custom((value, { req }) => {
        if (value != req.body.confirmPassword)
          throw new Error("Passwords do not match");
        return true;
      }),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Password confirmation is required"),

    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .custom(async (val) => {
            const exists = await Customer.exists({ email: val });
            if (exists) throw new Error("Email exists");
      }),

    body("address").notEmpty().withMessage("Address is required"),

    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone(["ar-EG", "ar-SA"])
      .withMessage("Invalid phone number"),
  ];
};


const stripeValidationRules = () => {
  const possibleCurrencies = /^(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|ISK|JMD|JPY|KES|KGS|KHR|KMF|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STD|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VES|VND|VUV|WST|XAF|XCD|XOF|XPF|YER|ZAR|ZMW)$/
  return [
    body('amount').isNumeric().withMessage('amount id should be number'),
    body('currency').isAlpha().matches(possibleCurrencies).withMessage('please check the currency'),
    body('description').isAlpha().withMessage('please check the description')
 ];
}

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
  stripeValidationRules,
  
  validate,
};
