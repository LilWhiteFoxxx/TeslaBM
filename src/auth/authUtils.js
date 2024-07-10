'use strict';

const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const prisma = require('../dbs/db');

const HEADER = {
    AUTHORIZATION: 'authorization',
};

const accessTokenSecret = process.env.ACCESS_SECRETKEY;

const createTokenPair = (payload, privateKey, expiresIn) => {
    try {
        const token = JWT.sign(payload, privateKey, expiresIn);

        return token;
    } catch (error) {
        throw error;
    }
};

// const authentication = asyncHandler(async (req, res, next) => {
//     const accessToken = req.headers[HEADER.AUTHORIZATION];
//     if (!accessToken) throw new AuthFailureError('Invalid Request');
//     console.log(accessToken);

//     try {
//         const decodeUser = JWT.verify(accessToken, accessTokenSecret);
//         console.log(decodeUser);
//         const user = await prisma.users.findFirst({
//             where: { id: decodeUser.id },
//         });
//         if (!user) throw new AuthFailureError('Invalid User');

//         req.userId = decodeUser.id;
//         req.userEmail = decodeUser.email;
//         return next();
//     } catch (error) {
//         throw error;
//     }
// });

const authentication = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers[HEADER.AUTHORIZATION];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AuthFailureError('Invalid Request');
    }

    const accessToken = authHeader.split(' ')[1]; // Extract the token after 'Bearer '
    if (!accessToken) throw new AuthFailureError('Invalid Request');

    console.log(accessToken);

    try {
        const decodeUser = JWT.verify(accessToken, accessTokenSecret);
        console.log(decodeUser);

        const user = await prisma.users.findFirst({
            where: { id: decodeUser.id },
        });
        if (!user) throw new AuthFailureError('Invalid User');

        req.userId = decodeUser.id;
        req.userEmail = decodeUser.email;
        return next();
    } catch (error) {
        throw error;
    }
});


module.exports = { createTokenPair, authentication };
