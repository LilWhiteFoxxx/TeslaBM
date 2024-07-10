'use strict';

const prisma = require('../dbs/db');
const { BadRequestError, AuthFailureError } = require('../core/error.response');


class UserService {

    static me = async (userId) => {
        const user = await prisma.users.findFirst({
            where: { id: userId }
        })

        if (!user) {
            throw new BadRequestError('User not found!');
        }

        console.log(user);

        return user
    }

    static updateProfile = async({ user, userId }) => {
        console.log(userId);
        console.log(user);
        if(!userId || !user ) {
            throw new BadRequestError('UserId empty')
        }

        await prisma.users.update({
            where: {id: userId},
            data: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dob: new Date(user.dob),
                phoneNumber: user.phoneNumber,
            }
        })

        const userInfo = await prisma.users.findFirst({
            where: {id : userId}
        })

        return userInfo
    }
    
    static updateAvatar = async(payload, userId) => {
        if(!userId) {
            throw new BadRequestError('UserId empty')
        }

        await prisma.users.update({
            where: {id: userId},
            data: {
                avatar: payload.avatar
            }
        })

        const userInfo = await prisma.users.findFirst({
            where: {id : userId}
        })

        return userInfo
    }
}

module.exports = UserService;
