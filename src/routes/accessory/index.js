'use strict'

const express = require('express')
const accessoriesController = require('../../controllers/accessories.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('/category', asyncHandler(accessoriesController.getAllMotorByCategory))
router.get('/allaccessoriesdetail', asyncHandler(accessoriesController.getAllAccessoriesDetail));
router.get('/:id', asyncHandler(accessoriesController.getAccessoriesDetail));
router.get('', asyncHandler(accessoriesController.getAllAcessories));

router.post('', asyncHandler(accessoriesController.createAccessories));
router.put('/:id', asyncHandler(accessoriesController.updateAccessories));
router.delete('/:id', asyncHandler(accessoriesController.deleteAccessories));




module.exports = router