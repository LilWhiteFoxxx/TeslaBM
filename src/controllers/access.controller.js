'use strict'

const AccessService = require("../services/access.service")
const { OK, CREATED, SuccessResponse} = require('../core/success.response')

class AccessController {
    handleRefreshToken = async(req, res, next) => {

        new SuccessResponse({
                message: 'Refresh token success!',
                metadata: await AccessService.handleRefreshToken(req.userEmail, req.userId)
        }).send(res)
    }

    login = async(req, res, next) => {
        new SuccessResponse({
            message: 'Login success!',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    register = async (req, res, next) => {
        new CREATED ({
            message: 'Registered OK!',
            metadata: await AccessService.register(req.body),
            // options: {
            //     limit: 10
            // }
        }).send(res)
    }

    me = async (req, res, next) => {
        new SuccessResponse ({
            message: 'Get Profile OK!',
            metadata: await AccessService.me(req.userId),
        }).send(res)
    }

    verifyEmail = async (req, res, next) => {
        new SuccessResponse ({
            message: 'Verified Email success',
            metadata: await AccessService.verifyEmail(req.query.token),
        }).send(res)
    }

    forgotPassword = async (req, res, next) => {
        new SuccessResponse ({
            message: 'Forgot password success',
            metadata: await AccessService.forgotPassword(req.body),
        }).send(res)
    }

    resetPassword = async (req, res, next) => {
        new SuccessResponse ({
            message: 'Reset password success',
            metadata: await AccessService.resetPassword(req.query.token),
        }).send(res)
    }
}

module.exports = new AccessController()