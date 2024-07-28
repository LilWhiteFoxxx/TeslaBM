'use strict';

const express = require('express');
const router = express.Router();

router.use('/api/v1/stripe', require('./stripe'));
router.use('/api/v1/colors', require('./color'));
router.use('/api/v1/categories', require('./category'));
router.use('/api/v1/accessories', require('./accessory'));
router.use('/api/v1/motors', require('./motor'));
router.use('/api/v1', require('./firebase'));
router.use('/api/v1', require('./access'));
router.use('/api/v1/user', require('./user'));
router.use('/api/v1/cart', require('./cart'));
router.use('/api/v1/checkout', require('./checkout'));
router.use('/api/v1/order', require('./order'));
router.use('/api/v1/payment', require('./payment'));

module.exports = router;
