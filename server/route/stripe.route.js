const express = require("express");
const router = express.Router({ strict: true });
const controller = require("../Controllers/stripe.controller");
const {body, param, query, check} = require("express-validator");
const ValidationMW = require("../Middlewares/cartValidationMW");


const possibleCurrencies = /^(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|ISK|JMD|JPY|KES|KGS|KHR|KMF|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STD|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VES|VND|VUV|WST|XAF|XCD|XOF|XPF|YER|ZAR|ZMW)$/


const Validation = [
    // body('customerId').isMongoId().withMessage('customer id should be mongoID'),
    body('amount').isNumeric().withMessage('amount id should be number'),
    body('currency').isAlpha().matches(possibleCurrencies).withMessage('please check the currency'),
    // body('source').isAlpha().withMessage('please check the source'),
    body('description').isAlpha().withMessage('please check the description')
];

router.route("/stripe")
    .post(Validation, ValidationMW, controller.tryStripe);


module.exports = router;