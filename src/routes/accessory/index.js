'use strict'

const express = require('express')
const accessoriesController = require('../../controllers/acessories.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')


router.get('/category', asyncHandler(accessoriesController.getAllMotorByCategory))
router.get('/:id', asyncHandler(accessoriesController.getMotorDetail));
router.get('', asyncHandler(accessoriesController.getAllAcessories));

router.post('', asyncHandler(accessoriesController.createAccessories));
router.put('/:id', asyncHandler(accessoriesController.updateMotor));
router.delete('/:id', asyncHandler(accessoriesController.deleteMotor));




module.exports = router