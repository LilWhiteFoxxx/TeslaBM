'use strict';

const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createTokenPair } = require('../auth/authUtils');
const prisma = require('../dbs/db');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const nodemailer = require('nodemailer');

const accessTokenSecret = process.env.ACCESS_SECRETKEY;
const refreshTokenSecret = process.env.REFRESH_SECRETKEY;
const emailVerificationSecret = process.env.EMAIL_SECRETKEY;
const passwordResetSecret = process.env.PASSWORD_SECRETKEY

const mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

class AccessService {
    static me = async (userId) => {
        const user = await prisma.users.findFirst({
            where: { id: userId },
        });
        if (!user) {
            throw new BadRequestError('User not found!');
        }
        console.log(user);

        return user;
    };

    // static register = async ({ username, email, password }) => {
    //     const existingUser = await prisma.users.findFirst({
    //         where: { email },
    //     });

    //     if (existingUser) {
    //         throw new BadRequestError('Error: User already registered!');
    //     }

    //     const passwordHash = await bcrypt.hash(password, 10);
    //     const newUser = await prisma.users.create({
    //         data: {
    //             username,
    //             email,
    //             password: passwordHash,
    //         },
    //     });

    //     return newUser;
    // };

    static register = async ({
        username,
        email,
        password,
        firstName,
        lastName,
    }) => {
        const existingUser = await prisma.users.findFirst({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestError('User already registered!');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password: passwordHash,
                firstName,
                lastName,
                avatar: 'https://i.pinimg.com/originals/6a/2c/fd/6a2cfda10fb8e3167ebaf6d63279864c.png',
            },
        });

        // Create a verification token
        const verificationToken = createTokenPair(
            { id: newUser.id, email: newUser.email },
            emailVerificationSecret,
            { expiresIn: '1d' } // Token validity
        );
        console.log(verificationToken);
        // Send the verification email
        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: newUser.email,
            subject: 'Email Verification',
            html: `<p>Thank you for registering. Please verify your email by clicking the following link: <a href="${process.env.URL_SERVER}/api/v1/verifyemail?token=${verificationToken}">Verify Email</a></p>`,
        };

        await mailTransporter.sendMail(mailOptions);

        return newUser;
    };

    static verifyEmail = async (token) => {
        let decoded;
        console.log(token);
        try {
            decoded = JWT.verify(token, emailVerificationSecret);
            console.log(decoded);
        } catch (err) {
            throw new BadRequestError('Invalid or expired verification token!');
        }

        const user = await prisma.users.findFirst({
            where: { id: decoded.id, email: decoded.email },
        });

        if (!user) {
            throw new BadRequestError('User not found!');
        }

        if (user.isVerify) {
            throw new BadRequestError('Email already verified!');
        }

        await prisma.users.update({
            where: { id: user.id },
            data: { isVerify: true },
        });

        await prisma.cart.create({
            data: {
                userId: user.id
            }
        })

        return { message: 'Email verified successfully' };
    };

    static login = async ({ email, password }) => {
        const user = await prisma.users.findFirst({
            where: { email },
        });

        if (!user) {
            throw new AuthFailureError('User not found!');
        }

        if (user.isVerify === false) {
            throw new AuthFailureError('User not verify!');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new AuthFailureError('Invalid password!');
        }

        const accessToken = createTokenPair(
            { id: user.id, email: user.email },
            accessTokenSecret,
            { expiresIn: '1d' }
        );
        const refreshToken = createTokenPair(
            { id: user.id, email: user.email },
            refreshTokenSecret,
            { expiresIn: '30d' }
        );

        await prisma.session.create({
            data: {
                email: user.email,
                refreshToken,
                // expiredAt
            },
        });

        delete user.password;

        return { user, accessToken, refreshToken };
    };

    static handleRefreshToken = async (email, userId) => {
        const session = await prisma.session.findFirst({
            where: { email: email },
        });

        if (!session) {
            throw new AuthFailureError('Invalid refresh token');
        }

        const user = await prisma.users.findFirst({
            where: { id: userId },
        });

        if (!user) {
            throw new AuthFailureError('User not found');
        }

        JWT.verify(session.refreshToken, refreshTokenSecret, (err, decoded) => {
            if (err) {
                throw new AuthFailureError('Invalid refresh token');
            }
        });

        const newAccessToken = createTokenPair(
            { id: user.id, email: user.email },
            accessTokenSecret,
            { expiresIn: '1d' }
        );
        const newRefreshToken = createTokenPair(
            { id: user.id, email: user.email },
            refreshTokenSecret,
            { expiresIn: '30d' }
        );

        await prisma.session.update({
            where: { id: session.id },
            data: { refreshToken: newRefreshToken },
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    };

    static forgotPassword = async (payload) => {
        const user = await prisma.users.findFirst({
            where: { email : payload.email },
        });

        if (!user) {
            throw new BadRequestError('User not found!');
        }

        // Create a password reset token
        const resetToken = createTokenPair(
            { id: user.id, email: user.email },
            passwordResetSecret,
            { expiresIn: '5m' } // Token validity
        );
        console.log(resetToken);
        // Send the password reset email
        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>To reset your password, please click the following link: <a href="${process.env.URL_SERVER}/api/v1/resetpassword?token=${resetToken}">Reset Password</a></p>`,
        };

        await mailTransporter.sendMail(mailOptions);

        return { message: 'Send token reset password' };
    };

    static resetPassword = async (token) => {
        let decoded;
        console.log(token);
        try {
            decoded = JWT.verify(token, passwordResetSecret);
            console.log(decoded);
        } catch (err) {
            throw new BadRequestError('Invalid or expired reset token!');
        }

        const user = await prisma.users.findFirst({
            where: { id: decoded.id, email: decoded.email },
        });

        if (!user) {
            throw new BadRequestError('User not found!');
        }

        // Generate a new password
        const newPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        await prisma.users.update({
            where: { id: user.id },
            data: { password: passwordHash },
        });

        // Send the new password to the user's email
        const mailOptions = {
            from: process.env.EMAIL_NAME,
            to: user.email,
            subject: 'Your New Password',
            html: `<p>Your password has been reset. Your new password is: <strong>${newPassword}</strong></p>`,
        };

        await mailTransporter.sendMail(mailOptions);

        return { message: 'New password has been sent to your email' };
    };
}

module.exports = AccessService;
