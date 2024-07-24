'use strict';

const express = require('express');
const stripeController = require('../../controllers/stripe.controller');
const { asyncHandler } = require('../../helpers'); // Ensure this helper is defined
const router = express.Router();

router.post(
    '/webhook',
    express.raw({ type: 'application/json' }), // Stripe requires raw body for webhook signatures
    asyncHandler(stripeController.handleWebhook.bind(stripeController))
);

module.exports = router;
