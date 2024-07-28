'use strict';
const StripeService = require('../services/stripe.service');
const { SuccessResponse } = require('../core/success.response');

class StripeController {
    async handleWebhook(req, res, next) {
        const sig = req.headers['stripe-signature'];
        // console.log('goo =======================', req.rawBody);
        try {
            await StripeService.processEvent(req.rawBody, sig);
            new SuccessResponse({
                message: 'Webhook handled successfully',
            }).send(res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StripeController();
