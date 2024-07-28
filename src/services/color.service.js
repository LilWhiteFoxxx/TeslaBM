'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');

class ColorService {
    static getAllColor = async () => {
        const colors = await prisma.color.findMany();

        if (!colors || colors.length === 0) {
            throw new BadRequestError('No color found!');
        }

        return colors;
    };
}

module.exports = ColorService;
