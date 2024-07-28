'use strict';

const express = require('express');
const orderController = require('../../controllers/order.controller');
const router = express.Router();
const { asyncHandler } = require('../../helpers');

router.get(
    '/orderstatisticsbystatus',
    asyncHandler(orderController.getOrderStatisticsByStatus)
);
router.get(
    '/topsellingproducts',
    asyncHandler(orderController.getTopSellingProducts)
);
router.get('/averageorder', asyncHandler(orderController.getAverageOrderValue));
router.get('/totalorders', asyncHandler(orderController.getTotalOrders));
router.get('/sales', asyncHandler(orderController.getTotalSales));
router.get('/allorder', asyncHandler(orderController.getAllOrder));
router.get('/:id', asyncHandler(orderController.getOrderById));
router.get('', asyncHandler(orderController.getOrdersByUserId));
router.post('/createorder', asyncHandler(orderController.createOrder));

router.put(
    '/updateorderstatus/:id',
    asyncHandler(orderController.updateOrderStatus)
);

module.exports = router;
