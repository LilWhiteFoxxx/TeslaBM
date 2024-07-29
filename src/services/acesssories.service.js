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
                                    img: true,
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

        const accessoriesIds = accessoriesDetails.map(
            (detail) => detail.accessoriesId
        );

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
                    originalPrice: Number(detail.originalPrice),
                    salePrice: Number(detail.salePrice),
                    colorId: detail.colorId ? Number(detail.colorId) : null,
                },
            });

            await prisma.inventories.create({
                data: {
                    accessoriesDetailId: accessoriesD.id,
                    stock: Number(detail.quantity),
                },
            });
        }

        // Create images if provided
        for (const image of images) {
            await prisma.images.create({
                data: {
                    accessoriesId: newAcessories.id,
                    path: image,
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

    static updateAccessories = async (
        id,
        name,
        originalPrice,
        categoryId,
        colorId,
        mfg,
        stock
    ) => {
        const accessoriesDetail = await prisma.accessoriesDetail.findUnique({
            where: { id: id },
        });

        if (!accessoriesDetail) {
            throw new BadRequestError('Accessories not found!');
        }
        const accessories = await prisma.accessories.findUnique({
            where: { id: accessoriesDetail.accessoriesId },
        });

        const inventory = await prisma.inventories.findFirst({
            where: { accessoriesDetailId: accessoriesDetail.id },
        });

        const newSlug = name
            ? slugify(name + ' ' + mfg, { lower: true, strict: true })
            : accessories.slug;

        const updatedAccessories = await prisma.accessories.update({
            where: { id: accessories.id },
            data: {
                name: name || accessories.name,
                slug: newSlug,
                // desc: desc || accessories.desc,
                // originalPrice: originalPrice || accessories.originalPrice,
                motorId: +categoryId || accessories.motorId,
                mfg: mfg || accessories.mfg,
            },
        });

        const updatedAccessoriesDetail = await prisma.accessoriesDetail.update({
            where: { id },
            data: {
                originalPrice:
                    +originalPrice || accessoriesDetail.originalPrice,
                salePrice: +originalPrice || accessoriesDetail.salePrice,
                colorId: +colorId || accessoriesDetail.colorId,
            },
        });

        const updatedInventories = await prisma.inventories.update({
            where: { id: inventory.id },
            data: {
                stock: +stock || inventory.stock,
            },
        });

        // Fetch the updated accessories with its details
        const accessoriesWithDetails = await prisma.accessories.findUnique({
            where: { id: accessories.id },
            include: {
                accessoriesDetail: {
                    include: { color: true, inventories: true },
                },
                images: true,
            },
        });

        return accessoriesWithDetails;
    };

    static deleteAccessories = async (id) => {
        if (!id) {
            throw new BadRequestError('ID is required');
        }

        // Tìm thông tin chi tiết của motor
        const accessoriesDetail = await prisma.accessoriesDetail.findUnique({
            where: { id },
        });

        if (!accessoriesDetail) {
            throw new BadRequestError('accessoriesDetail not found');
        }

        // Xóa chi tiết accessories
        await prisma.accessoriesDetail.delete({
            where: { id },
        });

        // Kiểm tra còn chi tiết nào khác cho accessories không
        const remainingDetails = await prisma.accessoriesDetail.findMany({
            where: { accessoriesId: accessoriesDetail.accessoriesId },
        });

        // Nếu không còn chi tiết nào, xóa accessories và hình ảnh liên quan
        if (remainingDetails.length === 0) {
            await prisma.accessories.delete({
                where: { id: accessoriesDetail.accessoriesId },
            });
            await prisma.images.deleteMany({
                where: { accessoriesId: accessoriesDetail.accessoriesId },
            });
        }

        return { message: 'Accessories deleted successfully!' };
    };
}

module.exports = AccessoriesService;
