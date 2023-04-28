const express = require("express");
const router = express.Router({ strict: true });
const controller = require("../Controllers/stripe.controller");
const {stripeValidationRules, validate} = require("../Middlewares/validation.mw");


router.route("/stripe")
      .post(stripeValidationRules(), validate, controller.tryStripe);

module.exports = router;