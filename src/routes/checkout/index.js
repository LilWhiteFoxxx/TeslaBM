'use strict'

const express = require('express')
const checkoutController = require('../../controllers/checkout.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.post('/:id', asyncHandler(checkoutController.checkCartItem));
router.post('', asyncHandler(checkoutController.calculateTotal));


module.exports = router