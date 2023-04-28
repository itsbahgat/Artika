const express = require("express");
const router = express.Router({ strict: true });
const controller = require("../controllers/stripe.controller");
const {stripeValidationRules, validate} = require("../middlewares/validation.mw");


router.route("/stripe")
      .post(stripeValidationRules(), validate, controller.tryStripe);

module.exports = router;