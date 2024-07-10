'use strict';

const UserService = require('../services/user.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class UserController {
    updateProfile = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update success!',
            metadata: await UserService.updateProfile({
                user: req.body,
                userId: req.userId,
            }),
        }).send(res);
    };

    me = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get Profile OK!',
            metadata: await UserService.me(req.userId),
        }).send(res);
    };

    updateAvatar = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update avatar success!',
            metadata: await UserService.updateAvatar(req.body, req.userId),
        }).send(res);
    };
}

module.exports = new UserController();
