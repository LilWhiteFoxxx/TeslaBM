'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');

class CartService {
    static getAllCart = async (userId) => {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) {
            throw new BadRequestError('No cart found!');
        }

        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: cart.id,
            },
        });

        const result = await Promise.all(
            cartItems.map(async (item) => {
                if (item.motorDetailId) {
                    const motorDetail = await prisma.motorDetail.findFirst({
                        where: {
                            id: item.motorDetailId,
                        },
                        select: {
                            originalPrice: true,
                            salePrice: true,
                            colorId: true,
                            motorId: true,
                            motor: {
                                select: {
                                    name: true,
                                    img: true,
                                },
                            },
                            color: {
                                select: {
                                    name: true,
                                    img: true,
                                },
                            },
                        },
                    });
                    return {
                        ...item,
                        ...motorDetail,
                        itemName: motorDetail.motor.name,
                        itemImg: motorDetail.motor.img,
                        colorName: motorDetail.color.name,
                        colorImg: motorDetail.color.img,
                    };
                } else if (item.accessoriesDetailId) {
                    const accessoriesDetail =
                        await prisma.accessoriesDetail.findFirst({
                            where: {
                                id: item.accessoriesDetailId,
                            },
                            select: {
                                originalPrice: true,
                                salePrice: true,
                                colorId: true,
                                accessoriesId: true,
                                accessories: {
                                    select: {
                                        name: true,
                                        img: true,
                                    },
                                },
                                color: {
                                    select: {
                                        name: true,
                                        img: true,
                                    },
                                },
                            },
                        });
                    return {
                        ...item,
                        ...accessoriesDetail,
                        itemName: accessoriesDetail.accessories.name,
                        itemImg: accessoriesDetail.accessories.img,
                        colorName: accessoriesDetail?.color?.name,
                        colorImg: accessoriesDetail?.color?.img,
                    };
                } else {
                    return item;
                }
            })
        );

        return result;
    };

    static addToCart = async (userId, payload) => {
        if (!userId || !payload) {
            throw new BadRequestError('Required!');
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) throw new BadRequestError('Cart not found');

        let item;

        if (payload.type === 'motor') {
            item = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    motorDetailId: payload.productId,
                },
            });

            if (item) {
                item = await prisma.cartItem.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        quantity: item.quantity + payload.quantity,
                    },
                });
            } else {
                item = await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        motorDetailId: payload.productId,
                        quantity: payload.quantity,
                    },
                });
            }
        } else {
            item = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    accessoriesDetailId: payload.productId,
                },
            });

            if (item) {
                item = await prisma.cartItem.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        quantity: item.quantity + payload.quantity,
                    },
                });
            } else {
                item = await prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        accessoriesDetailId: payload.productId,
                        quantity: payload.quantity,
                    },
                });
            }
        }

        if (!item) {
            throw new BadRequestError('Cannot create or update cartItem');
        }

        return item;
    };

    static updateCartItem = async (userId, payload) => {
        if (!userId || !payload) {
            throw new BadRequestError('Required!');
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) throw new BadRequestError('Cart not found');

        let item;

        if (payload.type === 'motor') {
            item = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    motorDetailId: payload.productId,
                },
            });
        } else {
            item = await prisma.cartItem.findFirst({
                where: {
                    cartId: cart.id,
                    accessoriesDetailId: payload.productId,
                },
            });
        }

        if (!item) {
            throw new BadRequestError('CartItem not found');
        }

        item = await prisma.cartItem.update({
            where: {
                id: item.id,
            },
            data: {
                quantity: payload.quantity,
                // Add other fields you might want to update
            },
        });

        if (!item) {
            throw new BadRequestError('Cannot update cartItem');
        }

        return item;
    };

    static deleteCartItem = async (userId, cartItemId) => {
        if (!userId || !cartItemId) {
            throw new BadRequestError('Required!');
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) throw new BadRequestError('Cart not found');

        // if (payload.type === 'motor') {
        //     item = await prisma.cartItem.findFirst({
        //         where: {
        //             cartId: cart.id,
        //             motorDetailId: payload.productId,
        //         },
        //     });
        // } else {
        //     item = await prisma.cartItem.findFirst({
        //         where: {
        //             cartId: cart.id,
        //             accessoriesDetailId: payload.productId,
        //         },
        //     });
        // }

        const item = await prisma.cartItem.findFirst({
            where: {
                id: cartItemId,
                cartId: cart.id,
            },
        });

        if (!item) {
            throw new BadRequestError('CartItem not found');
        }

        await prisma.cartItem.delete({
            where: {
                id: item.id,
            },
        });

        return { message: 'CartItem deleted successfully' };
    };

    static deleteCart = async (userId) => {
        if (!userId) {
            throw new BadRequestError('Required!');
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) throw new BadRequestError('Cart not found');

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id,
            },
        });

        return { message: 'Cart deleted successfully' };
    };
}

module.exports = CartService;
