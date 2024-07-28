'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')
const { authentication } = require('../../auth/authUtils')

// SignUp
router.post('/register', asyncHandler(accessController.register))
router.get('/verifyemail', asyncHandler(accessController.verifyEmail));
router.post('/forgotpassword', asyncHandler(accessController.forgotPassword));
router.get('/resetpassword', asyncHandler(accessController.resetPassword));

// Login
router.post('/login', asyncHandler(accessController.login))

// Authentication
router.use(authentication)

// router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/handlerefreshtoken', asyncHandler(accessController.handleRefreshToken))
router.get('/me', asyncHandler(accessController.me))


module.exports = router