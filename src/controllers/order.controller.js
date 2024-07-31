'use strict';

const OrderService = require('../services/order.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class OrderController {
    createOrder = async (req, res, next) => {
        try {
            const { cartItems, paymentMethodId } = req.body;
            const order = await OrderService.createOrder(
                req.userId,
                cartItems,
                Number(paymentMethodId)
            );
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
            const order = await OrderService.getOrderById(
                Number(req.params.id)
            );
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
            const orders = await OrderService.getOrdersByUserId(
                Number(req.userId)
            );
            new SuccessResponse({
                message: 'Get order by UserId success!',
                metadata: orders,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAllOrder = async (req, res, next) => {
        try {
            const orders = await OrderService.getAllOrder();
            new SuccessResponse({
                message: 'Get all order success!',
                metadata: orders,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    updateOrderStatus = async (req, res, next) => {
        try {
            const orderId = req.params.id;
            const { orderStatusId } = req.body;
            const orders = await OrderService.updateOrderStatus(
                Number(orderId),
                Number(orderStatusId)
            );
            new SuccessResponse({
                message: 'Get all order success!',
                metadata: orders,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getTotalSales = async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const totalSales = await OrderService.getTotalSales(
                startdate,
                enddate
            );
            new SuccessResponse({
                message: 'Get total sales success!',
                metadata: { totalSales },
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getTotalOrders = async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const totalOrders = await OrderService.getTotalOrders(
                startdate,
                enddate
            );
            new SuccessResponse({
                message: 'Get total orders success!',
                metadata: { totalOrders },
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getAverageOrderValue = async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const averageOrderValue = await OrderService.getAverageOrderValue(
                startdate,
                enddate
            );
            new SuccessResponse({
                message: 'Get average order value success!',
                metadata: { averageOrderValue },
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getTopSellingProducts = async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const topSellingProducts = await OrderService.getTopSellingProducts(
                startdate,
                enddate
            );
            new SuccessResponse({
                message: 'Get top selling products success!',
                metadata: topSellingProducts,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };

    getOrderTotalSaleByStatus = async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const orderStatisticsByStatus =
                await OrderService.getOrderTotalSaleByStatus(
                    startdate,
                    enddate
                );
            new SuccessResponse({
                message: 'Get order statistics by status success!',
                metadata: orderStatisticsByStatus,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new OrderController();
