'use strict';

const CheckoutService = require('../services/checkout.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class CheckoutController {
    checkCartItem = async (req, res, next) => {
        try {
            const cartItem = await CheckoutService.checkCartItem(req.userId, Number(req.params.id));
            new SuccessResponse({
                message: 'Check cart item success!',
                metadata: cartItem,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    calculateTotal = async (req, res, next) => {
        try {
            const total = await CheckoutService.calculateTotal(req.userId);
            new SuccessResponse({
                message: 'Calculate total success!',
                metadata: total,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

}

module.exports = new CheckoutController();
