'use strict';

const prisma = require('../dbs/db');
const { BadRequestError } = require('../core/error.response');

class CheckoutService {
    static checkCartItem = async (userId, cartItemId) => {
        if (!userId || !cartItemId) {
            throw new BadRequestError('Required!');
        }

        const cart = await prisma.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        if (!cart) {
            throw new BadRequestError('Cart Not Found');
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id: cartItemId },
        });

        if (!cartItem) {
            throw new BadRequestError('Cart Item Not Found');
        }

        if (cartItem.motorDetailId) {
            const motorDetail = await prisma.motorDetail.findFirst({
                where: { id: cartItem.motorDetailId },
            });
            if (!motorDetail) {
                throw new BadRequestError('Motor Detail Not Found');
            }
            const inventory = await prisma.inventories.findFirst({
                where: { motorDetailId: motorDetail.id },
            });
            if (inventory.stock < cartItem.quantity) {
                throw new BadRequestError(`Not enough stock for motor item (Only ${inventory.stock} products)`);
            }
        }

        if (cartItem.accessoriesDetailId) {
            const accessoriesDetail = await prisma.accessoriesDetail.findFirst({
                where: { id: cartItem.accessoriesDetailId },
            });
            if (!accessoriesDetail) {
                throw new BadRequestError('Accessories Detail Not Found');
            }
            const inventory = await prisma.inventories.findFirst({
                where: { accessoriesDetailId: accessoriesDetail.id },
            });
            if (inventory.stock < cartItem.quantity) {
                throw new BadRequestError(
                    `Not enough stock for motor item (Only ${inventory.stock} products)`
                );
            }
        }

        return cartItem;
    };

    static calculateTotal = async (userId) => {
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cart: {
                    userId: userId,
                },
            },
            include: {
                motorDetail: true,
                accessoriesDetail: true,
            },
        });

        if (!cartItems.length) {
            throw new BadRequestError('Cart is empty');
        }

        const total = cartItems.reduce((acc, item) => {
            let price = 0;
            if (item.motorDetail) {
                price =
                    item.motorDetail.salePrice < item.motorDetail.originalPrice
                        ? item.motorDetail.salePrice
                        : item.motorDetail.originalPrice;
            } else if (item.accessoriesDetail) {
                price =
                    item.accessoriesDetail.salePrice <
                    item.accessoriesDetail.originalPrice
                        ? item.accessoriesDetail.salePrice
                        : item.accessoriesDetail.originalPrice;
            }
            return acc + price * item.quantity;
        }, 0);

        return total;
    };
}

module.exports = CheckoutService;
