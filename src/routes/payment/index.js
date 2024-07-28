'use strict';

const express = require('express');
const PaymentController = require('../../controllers/payment.controller');
const router = express.Router();
const { asyncHandler } = require('../../helpers');

router.post(
    '/create-checkout-session',
    asyncHandler(PaymentController.createCheckoutSession)
);

module.exports = router;
