'use strict'

const express = require('express')
const multer = require('multer');
const FirebaseController = require('../../controllers/firebase.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')
const { authentication } = require('../../auth/authUtils')

const upload = multer({ storage: multer.memoryStorage() });
// Authentication
// router.use(authentication)

// router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/uploadfirebase', upload.any(), asyncHandler(FirebaseController.uploadToFirebase))


module.exports = router