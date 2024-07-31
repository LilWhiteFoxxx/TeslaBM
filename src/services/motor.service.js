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
                dataAndEquipment: true,
                category: {
                    select: { name: true },
                },
            },
        });

        if (!motors || motors.length === 0) {
            throw new BadRequestError('No motors found!');
        }

        const results = await Promise.all(
            motors.map(async (motor) => {
                // Fetch motorDetails for the current motor including color
                const motorDetails = await prisma.motorDetail.findMany({
                    where: { motorId: motor.id },
                    include: {
                        color: {
                            select: {
                                name: true,
                                img: true,
                            },
                        },
                    },
                });

                // Fetch inventories based on motorDetails ids
                const inventories = await Promise.all(
                    motorDetails.map(async (motorDetail) => {
                        return await prisma.inventories.findMany({
                            where: { motorDetailId: motorDetail.id },
                            select: {
                                id: true,
                                motorDetailId: true,
                                stock: true,
                            },
                        });
                    })
                );

                return { motor, motorDetails, inventories };
            })
        );

        const mappedMotors = results.map(
            ({ motor, motorDetails, inventories }) => {
                const flattenedInventories = inventories.flat();
                const stockStatus = flattenedInventories.some(
                    (inventory) => inventory.stock > 0
                );

                return {
                    id: motor.id,
                    itemImg: motor.img,
                    itemImgHover: motor.imgHover,
                    itemName: motor.name,
                    itemPrice: motor.originalPrice,
                    slug: motor.slug,
                    desc: motor.desc,
                    dataAndEquipment: motor.dataAndEquipment,
                    subCategory: motor.category.name, // Adjust this field if necessary
                    category: 'motors',
                    stockStatus, // Set stockStatus based on inventories
                    options: ['view-details'], // Placeholder options, replace with actual data if available
                    mfg: motor.mfg,
                    productDetails: motorDetails.map((md) => {
                        const res = flattenedInventories.filter(
                            (inv) => inv.motorDetailId === md.id
                        );
                        return {
                            id: md.id,
                            motorId: md.motorId,
                            colorId: md.colorId,
                            color: md.color.name,
                            colorImage: md.color.img,
                            originalPrice: md.originalPrice,
                            salePrice: md.salePrice,
                            // inventories: flattenedInventories.filter(
                            //     (inv) => inv.motorDetailId === md.id
                            // ),
                            inventoriesId: res[0].id,
                            stock: res[0].stock,
                        };
                    }),
                    // inventories: flattenedInventories, // Include and flatten inventories in the returned object
                };
            }
        );

        return mappedMotors;
    };

    static getMotorById = async (id) => {
        // Fetch motor details
        const motor = await prisma.motor.findUnique({
            where: { id: id },
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
                dataAndEquipment: true,
                category: {
                    select: { name: true },
                },
                images: {
                    select: {
                        id: true,
                        path: true,
                    },
                },
            },
        });

        if (!motor) {
            throw new BadRequestError('No motor found!');
        }

        // Fetch motor details for the current motor including color
        const motorDetails = await prisma.motorDetail.findMany({
            where: { motorId: motor.id },
            include: {
                color: {
                    select: {
                        name: true,
                        img: true,
                    },
                },
            },
        });

        // Fetch inventories based on motorDetails ids
        const inventories = await Promise.all(
            motorDetails.map(async (motorDetail) => {
                return await prisma.inventories.findMany({
                    where: { motorDetailId: motorDetail.id },
                    select: {
                        id: true,
                        motorDetailId: true,
                        stock: true,
                    },
                });
            })
        );

        // Flatten inventories array
        const flattenedInventories = inventories.flat();
        const stockStatus = flattenedInventories.some(
            (inventory) => inventory.stock > 0
        );

        // Map motors to desired format
        const mappedMotor = {
            id: motor.id,
            itemImg: motor.img,
            itemImgHover: motor.imgHover,
            itemName: motor.name,
            itemPrice: motor.originalPrice,
            slug: motor.slug,
            desc: motor.desc,
            dataAndEquipment: motor.dataAndEquipment,
            subCategory: motor.category.name, // Adjust this field if necessary
            category: 'motors',
            stockStatus, // Set stockStatus based on inventories
            options: ['view-details'], // Placeholder options, replace with actual data if available
            mfg: motor.mfg,
            productDetails: motorDetails.map((md) => {
                const res = flattenedInventories.find(
                    (inv) => inv.motorDetailId === md.id
                );
                return {
                    id: md.id,
                    motorId: md.motorId,
                    colorId: md.colorId,
                    color: md.color.name,
                    colorImage: md.color.img,
                    originalPrice: md.originalPrice,
                    salePrice: md.salePrice,
                    inventoriesId: res ? res.id : null,
                    stock: res ? res.stock : 0,
                };
            }),
            images: motor.images,
        };

        return mappedMotor;
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
                        stock: true, // Lấy thông tin số lượng từ bảng inventories
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

    static getAllMotorDetail = async () => {
        const motorDetails = await prisma.motorDetail.findMany({
            select: {
                id: true,
                motor: {
                    select: {
                        name: true,
                        slug: true,
                        desc: true,
                        mfg: true,
                        img: true,
                        category: {
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

        if (!motorDetails.length) {
            throw new BadRequestError('No motors found!');
        }

        const motorIds = motorDetails.map((detail) => detail.motorId);

        // let images = [];
        // if (motorIds.length) {
        //     images = await prisma.images.findMany({
        //         where: {
        //             motorId: {
        //                 in: motorIds || null,
        //             },
        //         },
        //     });
        // }

        const motors = motorDetails.map((detail) => {
            const inventory = detail.inventories[0] || { stock: 0 };

            return {
                id: detail.id,
                motorId: detail.motorId,
                name: detail.motor.name,
                slug: detail.motor.slug,
                desc: detail.motor.desc,
                mfg: detail.motor.mfg,
                img: detail.motor.img,
                categoryId: detail.motor.category.id,
                categoryName: detail.motor.category.name,
                originalPrice: detail.originalPrice,
                salePrice: detail.salePrice,
                colorId: detail.colorId,
                color: detail.color.name,
                colorImage: detail.color.img,
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
        images = [],
        dataAndEquipment
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
                dataAndEquipment: dataAndEquipment,
            },
        });

        // Create motor details if provided
        for (const detail of motorDetails) {
            const motorD = await prisma.motorDetail.create({
                data: {
                    motorId: newMotor.id,
                    originalPrice: +detail.originalPrice,
                    salePrice: +detail.salePrice,
                    colorId: Number(detail.colorId),
                },
            });

            await prisma.inventories.create({
                data: {
                    motorDetailId: motorD.id,
                    stock: Number(detail.quantity),
                },
            });
        }

        // Create images if provided
        for (const image of images) {
            await prisma.images.create({
                data: {
                    motorId: newMotor.id,
                    path: image,
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
                dataAndEquipment: true,
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

    // static createMotor = async (
    //     name,
    //     desc,
    //     originalPrice,
    //     categoryId,
    //     mfg,
    //     img,
    //     imgHover,
    //     motorDetails = [],
    //     images = []
    // ) => {
    //     if (
    //         !name ||
    //         !desc ||
    //         !originalPrice ||
    //         !categoryId ||
    //         !mfg ||
    //         !motorDetails ||
    //         !images
    //     ) {
    //         throw new BadRequestError('Required!');
    //     }

    //     try {
    //         const slug = slugify(name + ' ' + mfg, {
    //             lower: true,
    //             strict: true,
    //         });

    //         // Create the motor
    //         const newMotor = await prisma.motor.create({
    //             data: {
    //                 name,
    //                 slug,
    //                 desc,
    //                 originalPrice,
    //                 img,
    //                 imgHover,
    //                 categoryId,
    //                 mfg,
    //             },
    //         });

    //         // Create motor details if provided
    //         for (const detail of motorDetails) {
    //             const motorD = await prisma.motorDetail.create({
    //                 data: {
    //                     motorId: newMotor.id,
    //                     originalPrice: Number(detail.originalPrice),
    //                     salePrice: Number(detail.salePrice),
    //                     colorId: Number(detail.colorId),
    //                 },
    //             });

    //             await prisma.inventories.create({
    //                 data: {
    //                     motorDetailId: motorD.id,
    //                     stock: Number(detail.quantity),
    //                 },
    //             });
    //         }

    //         // Create images if provided
    //         for (const image of images) {
    //             await prisma.images.create({
    //                 data: {
    //                     motorId: newMotor.id,
    //                     path: image,
    //                 },
    //             });
    //         }

    //         const motorWithDetails = await prisma.motor.findUnique({
    //             where: { id: newMotor.id },
    //             select: {
    //                 id: true,
    //                 name: true,
    //                 slug: true,
    //                 desc: true,
    //                 originalPrice: true,
    //                 categoryId: true,
    //                 mfg: true,
    //                 img: true,
    //                 imgHover: true,
    //                 motorDetail: {
    //                     select: {
    //                         id: true,
    //                         originalPrice: true,
    //                         salePrice: true,
    //                         colorId: true,
    //                         inventories: {
    //                             select: {
    //                                 id: true,
    //                                 stock: true,
    //                             },
    //                         },
    //                     },
    //                 },
    //                 images: {
    //                     select: {
    //                         id: true,
    //                         path: true,
    //                     },
    //                 },
    //             },
    //         });

    //         return motorWithDetails;
    //     } catch (error) {
    //         // Handle error appropriately
    //         console.error('Error creating motor:', error);
    //         throw new Error('Failed to create motor');
    //     }
    // };

    static updateMotor = async (
        id,
        name,
        originalPrice,
        categoryId,
        colorId,
        mfg,
        stock
    ) => {
        const motorDetail = await prisma.motorDetail.findUnique({
            where: { id: id },
        });

        if (!motorDetail) {
            throw new BadRequestError('Motor not found!');
        }
        const motor = await prisma.motor.findUnique({
            where: { id: motorDetail.motorId },
        });

        const inventory = await prisma.inventories.findFirst({
            where: { motorDetailId: motorDetail.id },
        });

        const newSlug = name
            ? slugify(name + ' ' + mfg, { lower: true, strict: true })
            : motor.slug;

        const updatedMotor = await prisma.motor.update({
            where: { id: motor.id },
            data: {
                name: name || motor.name,
                slug: newSlug,
                // desc: desc || motor.desc,
                // originalPrice: originalPrice || motor.originalPrice,
                categoryId: +categoryId || motor.categoryId,
                mfg: mfg || motor.mfg,
            },
        });

        const updatedMotorDetail = await prisma.motorDetail.update({
            where: { id },
            data: {
                originalPrice: +originalPrice || motorDetail.originalPrice,
                salePrice: +originalPrice || motorDetail.salePrice,
                colorId: +colorId || motorDetail.colorId,
            },
        });

        const updatedInventories = await prisma.inventories.update({
            where: { id: inventory.id },
            data: {
                stock: +stock || inventory.stock,
            },
        });

        // Fetch the updated motor with its details
        const motorWithDetails = await prisma.motor.findUnique({
            where: { id: motor.id },
            include: {
                motorDetail: {
                    include: { color: true, inventories: true },
                },
                images: true,
            },
        });

        return motorWithDetails;
    };

    static deleteMotor = async (id) => {
        if (!id) {
            throw new BadRequestError('ID is required');
        }

        // Tìm thông tin chi tiết của motor
        const motorDetail = await prisma.motorDetail.findUnique({
            where: { id },
        });

        if (!motorDetail) {
            throw new BadRequestError('MotorDetail not found');
        }

        // Xóa chi tiết motor
        await prisma.motorDetail.delete({
            where: { id },
        });

        // Kiểm tra còn chi tiết nào khác cho motor không
        const remainingDetails = await prisma.motorDetail.findMany({
            where: { motorId: motorDetail.motorId },
        });

        // Nếu không còn chi tiết nào, xóa motor và hình ảnh liên quan
        if (remainingDetails.length === 0) {
            await prisma.motor.delete({
                where: { id: motorDetail.motorId },
            });
            await prisma.images.deleteMany({
                where: { motorId: motorDetail.motorId },
            });
        }

        return { message: 'Motor deleted successfully!' };
    };
}

module.exports = MotorService;
