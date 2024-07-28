'use strict';

const express = require('express');
const colorController = require('../../controllers/color.controller');
const router = express.Router();
const { asyncHandler } = require('../../helpers');

router.get('/allcolor', asyncHandler(colorController.getAllColor));

module.exports = router;
