'use strict'

const express = require('express')
const UserController = require('../../controllers/user.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')
const { authentication } = require('../../auth/authUtils')

router.use(express.json());



// Authentication
router.use(authentication)

// router.post('/shop/logout', asyncHandler(UserController.logout))
router.post('/updateprofile', asyncHandler(UserController.updateProfile))
router.post('/updateavatar', asyncHandler(UserController.updateAvatar))
router.get('/me', asyncHandler(UserController.me))


module.exports = router