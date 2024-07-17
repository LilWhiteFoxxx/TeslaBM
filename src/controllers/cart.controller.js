'use strict';

const CartService = require('../services/cart.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class CartController {
    getAllCart = async (req, res, next) => {
        try {
            const carts = await CartService.getAllCart(req.userId);
            new SuccessResponse({
                message: 'Get all cart success!',
                metadata: carts,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    addToCart = async (req, res, next) => {
        try {
            const cartItem = await CartService.addToCart(req.userId, req.body);
            new SuccessResponse({
                message: 'Add to cart success!',
                metadata: cartItem,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

}

module.exports = new CartController();
