'use strict'

const express = require('express')
const cartController = require('../../controllers/cart.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('', asyncHandler(cartController.getAllCart));
router.post('/addtocart', asyncHandler(cartController.addToCart));

module.exports = router