'use strict';

const express = require('express');
const stripeController = require('../../controllers/stripe.controller');
const { asyncHandler } = require('../../helpers'); // Ensure this helper is defined

const router = express.Router();

router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    asyncHandler(stripeController.handleWebhook.bind(stripeController))
);

module.exports = router;
