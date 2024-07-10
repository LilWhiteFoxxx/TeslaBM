'use strict'

const FirebaseService = require("../services/firebase.service")
const { OK, CREATED, SuccessResponse} = require('../core/success.response')

class FirebaseController {
    uploadToFirebase  = async(req, res, next) => {

        new SuccessResponse({
                message: 'Upload successful!',
                metadata: await FirebaseService.uploadFiles(req.files)
        }).send(res)
    }

}

module.exports = new FirebaseController()