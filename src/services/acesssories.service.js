'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');
const slugify = require('slugify');

class AccessoriesService {
    static getAllAcessories = async (limit = 50, offset = 0) => {
        const accessories = await prisma.accessories.findMany({
            take: limit,
            skip: offset,
            select: {
                id: true,
                name: true,
                slug: true,
                desc: true,
                originalPrice: true,
                motorId: true,
                mfg: true,
                img: true,
                imgHover: true,
                motor: {
                    select: { name: true },
                },
            },
        });

        if (!accessories || accessories.length === 0) {
            throw new BadRequestError('No accessories found!');
        }

        const mappedAccessories = accessories.map((accessory) => ({
            id: accessory.id,
            itemImg: accessory.img,
            itemImgHover: accessory.imgHover,
            itemName: accessory.name,
            itemPrice: accessory.originalPrice,
            slug: accessory.slug,
            subCategory: accessory.motor.name, // Adjust this field if necessary
            category: 'accessories',
            stockStatus: true, // Placeholder value, replace with actual data if available
            options: ['quick-add+'], // Placeholder options, replace with actual data if available
            mfg: accessory.mfg,
        }));

        return mappedAccessories;
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
    static createAccessories = async (
        name,
        desc,
        originalPrice,
        motorId,
        mfg,
        img,
        imgHover,
        accessoriesDetails = [],
        images = []
    ) => {
        if (
            !name ||
            !desc ||
            !originalPrice ||
            !motorId ||
            !mfg ||
            !accessoriesDetails ||
            !images
        ) {
            throw new BadRequestError('Required!');
        }

        const slug = slugify(name + ' ' + mfg, { lower: true, strict: true });

        // Create the motor
        const newAcessories = await prisma.accessories.create({
            data: {
                name,
                slug,
                desc,
                originalPrice,
                img,
                imgHover,
                motorId,
                mfg,
            },
        });

        // Create motor details if provided
        for (const detail of accessoriesDetails) {
            const accessoriesD = await prisma.accessoriesDetail.create({
                data: {
                    accessoriesId: newAcessories.id,
                    originalPrice: detail.originalPrice,
                    salePrice: detail.salePrice,
                    colorId: detail.colorId,
                },
            });

            await prisma.inventories.create({
                data: {
                    accessoriesDetailId: accessoriesD.id,
                    stock: detail.quantity,
                },
            });
        }

        // Create images if provided
        for (const image of images) {
            await prisma.images.create({
                data: {
                    accessoriesId: newAcessories.id,
                    ...image,
                },
            });
        }

        const accessoriesWithDetails = await prisma.accessories.findUnique({
            where: { id: newAcessories.id },
            select: {
                id: true,
                name: true,
                slug: true,
                desc: true,
                originalPrice: true,
                motorId: true,
                mfg: true,
                img: true,
                imgHover: true,
                accessoriesDetail: {
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

        return accessoriesWithDetails;
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

module.exports = AccessoriesService;
