'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')


router.get('/category', asyncHandler(productController.getAllMotorByCategory))
router.get('/:id', asyncHandler(productController.getMotorDetail));
router.get('', asyncHandler(productController.getAllMotor));

router.post('', asyncHandler(productController.createMotor));
router.put('/:id', asyncHandler(productController.updateMotor));
router.delete('/:id', asyncHandler(productController.deleteMotor));




module.exports = router