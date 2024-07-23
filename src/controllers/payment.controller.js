'use strict';

const PaymentService = require('../services/payment.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class PaymentController {
    // Method to handle the creation of a checkout session
    async createCheckoutSession(req, res, next) {
        try {
            // Call the service to create a checkout session
            const session = await PaymentService.createCheckoutSession(req.userId, req.body);

            // Send a successful response with session metadata
            new SuccessResponse({
                message: 'Checkout session created successfully!',
                metadata: session,
            }).send(res);
        } catch (error) {
            // Pass any errors to the next middleware
            next(error);
        }
    }
}

module.exports = new PaymentController();
