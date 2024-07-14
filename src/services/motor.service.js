'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');
const slugify = require('slugify');

class MotorService {
    static getAllMotor = async (limit = 50, offset = 0) => {
        const motors = await prisma.motor.findMany({
            take: limit,
            skip: offset,
            select: {
                id: true,
                name: true,
                slug: true,
                desc: true,
                originalPrice: true,
                categoryId: true,
                mfg: true,
                img: true,
                imgHover: true,
                category: {
                    select: { name: true },
                },
            },
        });

        if (!motors || motors.length === 0) {
            throw new BadRequestError('No motors found!');
        }

        const mappedMotors = motors.map((motor) => ({
            id: motor.id,
            itemImg: motor.img,
            itemImgHover: motor.imgHover,
            itemName: motor.name,
            itemPrice: motor.originalPrice,
            slug: motor.slug,
            subCategory: motor.category.name, // Adjust this field if necessary
            category: 'motors',
            stockStatus: true, // Placeholder value, replace with actual data if available
            options: ['quick-add+', 'view-details'], // Placeholder options, replace with actual data if available
            mfg: motor.mfg,
        }));

        return mappedMotors;
    };

    static getAllMotor2 = async (limit = 50, offset = 0) => {
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

        const motorDetails = await prisma.motorDetail.findMany({
            where: { motorId: motorId },
            select: {
                id: true,
                motor: {
                    select: {
                        name: true,
                        slug: true,
                        desc: true,
                        mfg: true,
                    },
                },
                color: {
                    select: {
                        name: true,
                        img: true,
                    },
                },
                originalPrice: true,
                salePrice: true,
                colorId: true,
                inventories: {
                    select: {
                        stock: true,  // Lấy thông tin số lượng từ bảng inventories
                    },
                },
            },
        });
        const images = await prisma.images.findMany({
            where: { motorId: motorId },
        });

        const motors = motorDetails.map((detail) => {
            // Lấy thông tin tồn kho từ bảng inventories
            const inventory = detail.inventories[0] || { stock: 0 };

            return {
                id: detail.id,
                motorId: motorId,
                name: detail.motor.name,
                slug: detail.motor.slug,
                desc: detail.motor.desc,
                mfg: detail.motor.mfg,
                originalPrice: detail.originalPrice,
                salePrice: detail.salePrice,
                colorId: detail.colorId,
                color: detail.color.name,
                colorImage: detail.color.img,
                quantity: inventory.stock,
                images: images.map((image) => ({
                    id: image.id,
                    path: image.path,
                })),
            };
        });

        if (!motors.length) {
            throw new BadRequestError('Motor not found!');
        }

        return motors;
    };

    // Tạo một motor mới
    static createMotor = async (
        name,
        desc,
        originalPrice,
        categoryId,
        mfg,
        img,
        imgHover,
        motorDetails = [],
        images = []
    ) => {
        if (
            !name ||
            !desc ||
            !originalPrice ||
            !categoryId ||
            !mfg ||
            !motorDetails ||
            !images
        ) {
            throw new BadRequestError('Required!');
        }

        const slug = slugify(name + ' ' + mfg, { lower: true, strict: true });

        // Create the motor
        const newMotor = await prisma.motor.create({
            data: {
                name,
                slug,
                desc,
                originalPrice,
                img,
                imgHover,
                categoryId,
                mfg,
            },
        });

        // Create motor details if provided
        for (const detail of motorDetails) {
            const motorD = await prisma.motorDetail.create({
                data: {
                    motorId: newMotor.id,
                    originalPrice: detail.originalPrice,
                    salePrice: detail.salePrice,
                    colorId: detail.colorId,
                },
            });

            await prisma.inventories.create({
                data: {
                    motorDetailId: motorD.id,
                    stock: detail.quantity,
                },
            });
        }

        // Create images if provided
        for (const image of images) {
            await prisma.images.create({
                data: {
                    motorId: newMotor.id,
                    ...image,
                },
            });
        }

        const motorWithDetails = await prisma.motor.findUnique({
            where: { id: newMotor.id },
            select: {
                id: true,
                name: true,
                slug: true,
                desc: true,
                originalPrice: true,
                categoryId: true,
                mfg: true,
                img: true,
                imgHover: true,
                motorDetail: {
                    select: {
                        id: true,
                        originalPrice: true,
                        salePrice: true,
                        colorId: true,
                        inventories: {
                            select: {
                                id: true,
                                stock: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        id: true,
                        path: true,
                    },
                },
            },
        });

        return motorWithDetails;
    };

    static updateMotor = async (
        id,
        name,
        desc,
        originalPrice,
        salePrice,
        categoryId,
        mfg
    ) => {
        const motor = await prisma.motor.findUnique({
            where: { id },
        });

        const motorDetail = await prisma.motorDetail.findUnique({
            where: { motorId: id },
        });

        if (!motor) {
            throw new BadRequestError('Motor not found!');
        }

        const newSlug = name
            ? slugify(name + ' ' + mfg, { lower: true, strict: true })
            : motor.slug;

        const updatedMotor = await prisma.motor.update({
            where: { id },
            data: {
                name: name || motor.name,
                slug: newSlug,
                desc: desc || motor.desc,
                originalPrice: originalPrice || motor.originalPrice,
                categoryId: categoryId || motor.categoryId,
                mfg: mfg || motor.mfg,
            },
        });

        const updatedMotorDetail = await prisma.motor.update({
            where: { id },
            data: {
                originalPrice: originalPrice || motorDetail.originalPrice,
                salePrice: salePrice || motorDetail.salePrice,
            },
        });

        // Fetch the updated motor with its details
        const motorWithDetails = await prisma.motor.findUnique({
            where: { id },
            include: {
                motorDetails: { include: { color: true } }, // Bao gồm chi tiết motor và màu sắc của nó
                images: true, // Bao gồm hình ảnh của motor
            },
        });

        return motorWithDetails;
    };

    static deleteMotor = async (id) => {
        // Tìm motor để kiểm tra sự tồn tại của nó
        const motor = await prisma.motor.findUnique({
            where: { id },
            include: {
                motorDetails: true, // Bao gồm chi tiết motor để xóa các chi tiết motor liên quan
                images: true, // Bao gồm hình ảnh để xóa các hình ảnh liên quan
            },
        });

        if (!motor) {
            throw new BadRequestError('Motor not found!');
        }

        // Xóa tất cả các chi tiết motor liên quan
        await prisma.motorDetail.deleteMany({
            where: { motorId: id },
        });

        // Xóa tất cả các hình ảnh liên quan
        await prisma.images.deleteMany({
            where: { motorId: id },
        });

        // Xóa motor
        await prisma.motor.delete({
            where: { id },
        });

        return { message: 'Motor deleted successfully!' };
    };
}

module.exports = MotorService;
