'use strict';

const OrderService = require('../services/order.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');
const { orderStatus } = require('../dbs/db');

class OrderController {
    createOrder = async (req, res, next) => {
        try {
            const { cartItems, paymentMethodId } = req.body
            const order = await OrderService.createOrder(req.userId, cartItems, Number(paymentMethodId));
            new SuccessResponse({
                message: 'Create order success!',
                metadata: order,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getOrderById = async (req, res, next) => {
        try {
            const order = await OrderService.getOrderById(Number(req.params.id));
            new SuccessResponse({
                message: 'Get order by id success!',
                metadata: order,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getOrdersByUserId = async (req, res, next) => {
        try {
            const orders = await OrderService.getOrdersByUserId(Number(req.userId));
            new SuccessResponse({
                message: 'Get order by UserId success!',
                metadata: orders,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

}

module.exports = new OrderController();
