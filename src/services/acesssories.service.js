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

        const results = await Promise.all(
            accessories.map(async (accessory) => {
                const accessoriesDetails =
                    await prisma.accessoriesDetail.findMany({
                        where: { accessoriesId: accessory.id },
                        include: {
                            color: {
                                select: {
                                    name: true,
                                    img: true
                                },
                            },
                        },
                    });

                const inventories = await Promise.all(
                    accessoriesDetails.map(async (accessoriesDetail) => {
                        return await prisma.inventories.findMany({
                            where: {
                                accessoriesDetailId: accessoriesDetail.id,
                            },
                            select: {
                                id: true,
                                accessoriesDetailId: true,
                                stock: true,
                            },
                        });
                    })
                );

                return { accessory, accessoriesDetails, inventories };
            })
        );

        const mappedAccessories = results.map(
            ({ accessory, accessoriesDetails, inventories }) => {
                const flattenedInventories = inventories.flat();
                const stockStatus = flattenedInventories.some(
                    (inventory) => inventory.stock > 0
                );

                return {
                    id: accessory.id,
                    itemImg: accessory.img,
                    itemImgHover: accessory.imgHover,
                    itemName: accessory.name,
                    itemPrice: accessory.originalPrice,
                    slug: accessory.slug,
                    subCategory: accessory.motor.name,
                    category: 'accessories',
                    stockStatus, // Kiểm tra trạng thái tồn kho
                    options: ['quick-add+'], // Tùy chọn, có thể mở rộng thêm
                    mfg: accessory.mfg,
                    productDetails: accessoriesDetails.map((ad) => {
                        const res = flattenedInventories.filter(
                            (inv) => inv.accessoriesDetailId === ad.id
                        );

                        return {
                            id: ad.id,
                            accessoriesId: ad.accessoriesId,
                            colorId: ad?.colorId,
                            color: ad.color?.name,
                            colorImage: ad.color?.img,
                            originalPrice: ad.originalPrice,
                            salePrice: ad.salePrice,
                            inventoriesId: res[0].id,
                            stock: res[0].stock,
                        };
                    }),
                };
            }
        );

        return mappedAccessories;
    };

    static getAccessoriesDetail = async (accessoriesId) => {
        if (!accessoriesId) {
            throw new BadRequestError('Accessories ID is required!');
        }

        const accessoriesDetails = await prisma.accessoriesDetail.findMany({
            where: { accessoriesId: accessoriesId },
            select: {
                id: true,
                accessories: {
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
                        stock: true, // Lấy thông tin số lượng từ bảng inventories
                    },
                },
            },
        });
        const images = await prisma.images.findMany({
            where: { accessoriesId: accessoriesId },
        });

        const accessoriesReal = accessoriesDetails.map((detail) => {
            // Lấy thông tin tồn kho từ bảng inventories
            const inventory = detail.inventories[0] || { stock: 0 };

            return {
                id: detail.id,
                accessoriesId: accessoriesId,
                name: detail.accessories.name,
                slug: detail.accessories.slug,
                desc: detail.accessories.desc,
                mfg: detail.accessories.mfg,
                originalPrice: detail.originalPrice,
                salePrice: detail.salePrice,
                colorId: detail?.colorId,
                color: detail.color?.name,
                colorImage: detail.color?.img,
                quantity: inventory.stock,
                images: images.map((image) => ({
                    id: image.id,
                    path: image.path,
                })),
            };
        });

        if (!accessoriesReal.length) {
            throw new BadRequestError('Motor not found!');
        }

        return accessoriesReal;
    };

    static getAllAccessoriesDetail = async () => {
        const accessoriesDetails = await prisma.accessoriesDetail.findMany({
            select: {
                id: true,
                accessories: {
                    select: {
                        name: true,
                        slug: true,
                        desc: true,
                        mfg: true,
                        img: true,
                        motor: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
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
                createdAt: true,
                inventories: {
                    select: {
                        stock: true,
                    },
                },
            },
        });

        if (!accessoriesDetails.length) {
            throw new BadRequestError('No motors found!');
        }

        const accessoriesIds = accessoriesDetails.map((detail) => detail.accessoriesId);

        // let images = [];
        // if (accessoriesIds.length) {
        //     images = await prisma.images.findMany({
        //         where: {
        //             motorId: {
        //                 in: accessoriesIds || null,
        //             },
        //         },
        //     });
        // }

        const ac = accessoriesDetails.map((detail) => {
            const inventory = detail.inventories[0] || { stock: 0 };

            return {
                id: detail.id,
                accessoriesId: detail.accessoriesId,
                name: detail.accessories.name,
                slug: detail.accessories.slug,
                desc: detail.accessories.desc,
                mfg: detail.accessories.mfg,
                img: detail.accessories.img,
                categoryId: detail.accessories.motor.id,
                categoryName: detail.accessories.motor.name,
                originalPrice: detail.originalPrice,
                salePrice: detail.salePrice,
                colorId: detail?.colorId,
                color: detail?.color?.name,
                colorImage: detail?.color?.img,
                quantity: inventory.stock,
                createdAt: detail.createdAt,
                // images: images
                //     .filter((image) => image.motorId === detail.motorId)
                //     .map((image) => ({
                //         id: image.id,
                //         path: image.path,
                //     })),
            };
        });

        return ac;
    };

    // Tạo một accessories mới
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

    static deleteAccessories = async (id) => {
        // Tìm accessories để kiểm tra sự tồn tại của nó
        const accessories = await prisma.accessories.findUnique({
            where: { id },
            include: {
                accessoriesDetail: true, // Bao gồm chi tiết accessories để xóa các chi tiết accessories liên quan
                images: true, // Bao gồm hình ảnh để xóa các hình ảnh liên quan
            },
        });

        if (!accessories) {
            throw new BadRequestError('Accessories not found!');
        }

        // Xóa tất cả các chi tiết accessories liên quan
        await prisma.accessoriesDetail.deleteMany({
            where: { accessoriesId: id },
        });

        // Xóa tất cả các hình ảnh liên quan
        await prisma.images.deleteMany({
            where: { accessoriesId: id },
        });

        // Xóa accessories
        await prisma.accessories.delete({
            where: { id },
        });

        return { message: 'Accessories deleted successfully!' };
    };
}

module.exports = AccessoriesService;
