'use strict';

const StripeService = require('../services/stripe.service');
const { SuccessResponse } = require('../core/success.response');

class StripeController {
    async handleWebhook(req, res, next) {
        const sig = req.headers["stripe-signature"];
        try {
            await StripeService.processEvent(req.body, sig);
            new SuccessResponse({
                message: 'Webhook handled successfully',
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StripeController();
