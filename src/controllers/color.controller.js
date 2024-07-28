'use strict';

const ColorService = require('../services/color.service');
const { OK, CREATED, SuccessResponse } = require('../core/success.response');

class ColorController {
    getAllColor = async (req, res, next) => {
        try {
            const colors = await ColorService.getAllColor();
            new SuccessResponse({
                message: 'Get all Color success!',
                metadata: colors,
            }).send(res);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new ColorController();
