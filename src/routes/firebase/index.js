'use strict'

const express = require('express')
const multer = require('multer');
const FirebaseController = require('../../controllers/firebase.controller')
const router = express.Router()
const { asyncHandler } = require('../../helpers')

const upload = multer({ storage: multer.memoryStorage() });

router.post('/uploadfirebase', upload.any(), asyncHandler(FirebaseController.uploadToFirebase))


module.exports = router