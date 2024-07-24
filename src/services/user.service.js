'use strict';

const prisma = require('../dbs/db');
const { BadRequestError, AuthFailureError } = require('../core/error.response');


class UserService {

    static me = async (userId) => {
        const user = await prisma.users.findFirst({
            where: { id: userId },
            include: {
                address: true
            }
        })

        if (!user) {
            throw new BadRequestError('User not found!');
        }

        return user
    }

    static updateProfile = async ({ user, userId }) => {
        try {
            console.log('Updating profile for userId:', userId);
            console.log('User data:', user);
            
            if (!userId || !user) {
                throw new BadRequestError('UserId or user data is missing');
            }
    
            await prisma.users.update({
                where: { id: userId },
                data: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    dob: new Date(user.dob),
                    phoneNumber: user.phoneNumber,
                },
            });
    
            const userInfo = await prisma.users.findFirst({
                where: { id: userId },
            });
    
            return userInfo;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error; // Re-throw the error after logging it
        }
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
