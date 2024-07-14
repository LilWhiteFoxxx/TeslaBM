'use strict'

const express = require('express')
const router = express.Router()


router.use('/api/v1/categories', require('./category'))
router.use('/api/v1/accessories', require('./accessory'))
router.use('/api/v1/motors', require('./motor'))
router.use('/api/v1', require('./firebase'))
router.use('/api/v1', require('./access'))
router.use('/api/v1/user', require('./user'))

module.exports = router