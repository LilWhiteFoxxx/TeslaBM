'use strict'

const express = require('express')
const motorController = require('../../controllers/motor.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

router.get('/category', asyncHandler(motorController.getAllMotorByCategory))
router.get('/allmotordetail', asyncHandler(motorController.getAllMotorDetail));
router.get('/:id', asyncHandler(motorController.getMotorDetail));
router.get('/byid/:id', asyncHandler(motorController.getMotorById));
router.get('', asyncHandler(motorController.getAllMotor));

router.post('', asyncHandler(motorController.createMotor));
router.put('/:id', asyncHandler(motorController.updateMotor));
router.delete('/:id', asyncHandler(motorController.deleteMotor));




module.exports = router