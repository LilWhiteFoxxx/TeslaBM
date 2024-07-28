'use strict'

const express = require('express')
const categoryController = require('../../controllers/category.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('', asyncHandler(categoryController.getAllCategory));
router.get('/accessories', asyncHandler(categoryController.getAllCategoryOfAccessories));
router.post('', asyncHandler(categoryController.createCategory));
router.put('/:id', asyncHandler(categoryController.updateCategory));
router.delete('/:id', asyncHandler(categoryController.deleteCategory));



module.exports = router