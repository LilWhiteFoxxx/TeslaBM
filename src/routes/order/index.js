'use strict'

const express = require('express')
const orderController = require('../../controllers/order.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('/:id', asyncHandler(orderController.getOrderById));
router.get('', asyncHandler(orderController.getOrdersByUserId));
router.post('/createorder', asyncHandler(orderController.createOrder));


module.exports = router