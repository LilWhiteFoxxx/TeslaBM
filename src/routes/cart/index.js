'use strict'

const express = require('express')
const cartController = require('../../controllers/cart.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('', asyncHandler(cartController.getAllCart));
router.post('/addtocart', asyncHandler(cartController.addToCart));
router.put('/updatecartitem', asyncHandler(cartController.updateCartItem));
router.delete('/deletecartitem/:id', asyncHandler(cartController.deleteCartItem));
router.delete('', asyncHandler(cartController.deleteCart));

module.exports = router