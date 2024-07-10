'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');
const slugify = require('slugify');

class ProductService {
    static getAllMotor = async (limit = 50, offset = 0) => {
        const motors = await prisma.motor.findMany({
            take: limit,
            skip: offset,
        });

        if (!motors || motors.length === 0) {
            throw new BadRequestError('No motors found!');
        }

        return motors;
    };

    static getAllMotorByCategory = async (
        categoryId,
        limit = 50,
        offset = 0
    ) => {
        if (!categoryId) {
            throw new BadRequestError('Category ID is required!');
        }

        const motors = await prisma.motor.findMany({
            where: { categoryId: categoryId },
            take: limit,
            skip: offset,
        });

        if (!motors || motors.length === 0) {
            throw new BadRequestError(
                'No motors found for the given category!'
            );
        }

        return motors;
    };

    static getMotorDetail = async (motorId) => {
        if (!motorId) {
            throw new BadRequestError('Motor ID is required!');
        }

        const motor = await prisma.motor.findUnique({
            where: { id: motorId },
        });

        if (!motor) {
            throw new BadRequestError('Motor not found!');
        }

        return motor;
    };

    // Tạo một motor mới
    static createMotor = async (name, desc, originalPrice, categoryId) => {
        if (!name || !desc || !originalPrice || !categoryId) {
            throw new BadRequestError(
                'Name, desc, originalPrice, and categoryId are required!'
            );
        }

        const slug = slugify(name, { lower: true, strict: true }); // Tạo slug từ name

        const newMotor = await prisma.motor.create({
            data: { name, slug, desc, originalPrice, categoryId },
        });

        return newMotor;
    };

    // Cập nhật một motor theo id
    static updateMotor = async (
        id,
        name,
        slug,
        desc,
        originalPrice,
        categoryId
    ) => {
        const motor = await prisma.motor.findUnique({
            where: { id },
        });

        if (!motor) {
            throw new BadRequestError('Motor not found!');
        }

        // Nếu name được cập nhật, tạo lại slug từ name
        const newSlug = name
            ? slugify(name, { lower: true, strict: true })
            : slug || motor.slug;

        const updatedMotor = await prisma.motor.update({
            where: { id },
            data: {
                name: name || motor.name,
                slug: newSlug,
                desc: desc || motor.desc,
                originalPrice: originalPrice || motor.originalPrice,
                categoryId: categoryId || motor.categoryId,
            },
        });

        return updatedMotor;
    };

    // Xóa một motor theo id
    static deleteMotor = async (id) => {
        const motor = await prisma.motor.findUnique({
            where: { id },
        });

        if (!motor) {
            throw new BadRequestError('Motor not found!');
        }

        await prisma.motor.delete({
            where: { id },
        });

        return { message: 'Motor deleted successfully!' };
    };
}

module.exports = ProductService;
